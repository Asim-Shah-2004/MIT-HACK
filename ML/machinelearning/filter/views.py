import pymongo
from bson import ObjectId
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
import json
import logging
from dotenv import load_dotenv
import os
# Load environment variables from .env file
load_dotenv()

# Replace with your actual connection string and db name
connection_string = os.getenv('MONGO_CONNECTION_STRING')
db_name = os.getenv('MONGO_DB_NAME')

# Create a MongoClient once for reuse
client = pymongo.MongoClient(connection_string)
db = client[db_name]

# Set up logging
logger = logging.getLogger(__name__)

def serialize_document(document):
    """Recursively convert ObjectId and format the document for JSON serialization."""
    if isinstance(document, dict):
        return {key: serialize_document(value) for key, value in document.items()}
    elif isinstance(document, list):
        return [serialize_document(item) for item in document]
    elif isinstance(document, ObjectId):
        return str(document)  # Convert ObjectId to string
    else:
        return document  # Return the value as is if it's not ObjectId, dict, list, or bytes
    
import base64
class AllEntrepreneursView(View):
    def get(self, request):
        """Get all entrepreneurs data."""
        try:
            entrepreneurs = list(db.Entrepreneurs.find())
            serialized_entrepreneurs = [self.serialize_document(entrepreneur) for entrepreneur in entrepreneurs]
            return JsonResponse({'entrepreneurs': serialized_entrepreneurs})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    def serialize_document(self, document):
        """Recursively convert ObjectId and format the document for JSON serialization."""
        if isinstance(document, dict):
            return {key: self.serialize_document(value) for key, value in document.items()}
        elif isinstance(document, list):
            return [self.serialize_document(item) for item in document]
        elif isinstance(document, ObjectId):
            return str(document)  # Convert ObjectId to string
        elif isinstance(document, bytes):
            return base64.b64encode(document).decode('utf-8')  # Convert bytes to base64 string
        else:
            return document  # Return the value as is if it's not ObjectId, dict, list, or bytes
        

class AllInvestorsView(View):
    def get(self, request):
        """Get all entrepreneurs data."""
        try:
            investors = list(db.Investors.find())
            serialized_investor = [self.serialize_document(investor) for investor in investors]
            return JsonResponse({'investors': serialized_investor})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    def serialize_document(self, document):
        """Recursively convert ObjectId and format the document for JSON serialization."""
        if isinstance(document, dict):
            return {key: self.serialize_document(value) for key, value in document.items()}
        elif isinstance(document, list):
            return [self.serialize_document(item) for item in document]
        elif isinstance(document, ObjectId):
            return str(document)  # Convert ObjectId to string
        elif isinstance(document, bytes):
            return base64.b64encode(document).decode('utf-8')  # Convert bytes to base64 string
        else:
            return document  # Return the value as is if it's not ObjectId, dict, list, or bytes


from rest_framework.views import APIView

class FilterInvestorsView(APIView):
    def get(self, request):
        # Retrieve query parameters from the request
        industries = request.GET.getlist('industry')  # List of industries from query params
        country = request.GET.get('country', None)  # Country filter (optional)
        state = request.GET.get('state', None)  # Country filter (optional)
        city = request.GET.get('city', None)  # Country filter (optional)
        min_invest = request.GET.get('min_invest', None) 
        rural_business = request.GET.get('rural_business') # Minimum investment (optional)
        print(industries)
        print(country)
        print(min_invest)
        # Build the MongoDB query dynamically
        query = {}
        if industries:
            query['interestedIndustries'] = {"$in": industries}
        
        if country:
            query['location.country'] = country
        if state:
            query['location.state'] = state
        if city:
            query['location.city'] = city

        if min_invest:
            query['amountLookingToInvest'] = {"$gte": int(min_invest)}  # Ensure type is int
        if rural_business is not None:
            query['interestedInRuralBusiness'] = rural_business.lower() == 'true'

        print(f"MongoDB Query: {query}")  # Debugging: Log the query being used

        # Execute the query
        investors = list(db.Investors.find(query))
        print("hi")
        print(investors)
        # Convert MongoDB documents to JSON-serializable format
        for investor in investors:
            investor['_id'] = str(investor['_id'])  # Convert ObjectId to string

        return JsonResponse(investors, safe=False)


class FilterEntrepreneursView(APIView):
    def get(self, request):
        # Retrieve query parameters from the request
        country = request.GET.get('country', None)  # Country filter (optional)
        state = request.GET.get('state', None)  # Country filter (optional)
        city = request.GET.get('city', None)  # Country filter (optional)
       
        type = request.GET.get('type') # Minimum investment (optional)

        print(country)

        # Build the MongoDB query dynamically
        query = {}

        if type:
            query['entrepreneurType'] = {"$in": type}
        
        if country:
            query['location.country'] = country
        if state:
            query['location.state'] = state
        if city:
            query['location.city'] = city


        print(f"MongoDB Query: {query}")  # Debugging: Log the query being used

        # Execute the query
        entrepreneurs = list(db.Entrepreneurs.find(query))
        print("hi")
        print(entrepreneurs)
        # Convert MongoDB documents to JSON-serializable format
        for entrepreneur in entrepreneurs:
            entrepreneur['_id'] = str(entrepreneur['_id'])  # Convert ObjectId to string

        return JsonResponse(entrepreneurs, safe=False)
