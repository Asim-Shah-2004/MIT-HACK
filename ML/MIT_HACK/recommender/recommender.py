from .models import Investor, SME

def recommend_smes_for_investor(investor_id):
    try:
        investor = Investor.objects.get(id=investor_id)
    except Investor.DoesNotExist:
        return None  # Or handle the error as needed

    recommendations = SME.objects.filter(
        business_type__in=investor.interested_industries,
        location_state=investor.location_state
    )
    
    return recommendations
