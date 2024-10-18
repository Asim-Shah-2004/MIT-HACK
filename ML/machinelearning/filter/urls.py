from django.urls import path
from .views import (
    AllEntrepreneursView,
    AllInvestorsView,
    FilterInvestorsView,
    FilterEntrepreneursView,
)

urlpatterns = [
    path('entrepreneurs/', AllEntrepreneursView.as_view(), name='all-entrepreneurs'),
    path('investors/', AllInvestorsView.as_view(), name='all-investors'),
    path('investors/filter/', FilterInvestorsView.as_view(), name='filter-investors'),
    path('entrepreneurs/filter/', FilterEntrepreneursView.as_view(), name='filter-entrepreneurs'),
]

