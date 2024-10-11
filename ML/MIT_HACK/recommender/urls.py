from django.urls import path
from .views import get_recommendations

urlpatterns = [
    path('recommendations/<int:investor_id>/', get_recommendations, name='get_recommendations'),
]
