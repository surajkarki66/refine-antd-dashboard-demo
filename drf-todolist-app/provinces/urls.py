from django.urls import path

from provinces.views import ListDistrictAPIView, ListProvinceAPIView

urlpatterns = [
    path("", ListProvinceAPIView.as_view(), name="provinces"),
    path("districts/", ListDistrictAPIView.as_view(), name="districts"),
 
]
