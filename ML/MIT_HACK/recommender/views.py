from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from .recommender import recommend_smes_for_investor

def get_recommendations(request, investor_id):
    recommendations = recommend_smes_for_investor(investor_id)
    if recommendations is None:
        return JsonResponse({'error': 'Investor not found'}, status=404)
    
    response_data = [{"full_name": sme.full_name, "email": sme.email} for sme in recommendations]
    return JsonResponse(response_data, safe=False)
