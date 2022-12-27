from django.urls import path

from .views import ProvinceListView, DistrictListView

urlpatterns = [
    path("", ProvinceListView.as_view(), name="provinces"),
    path("<int:province_id>/districts/", DistrictListView.as_view(), name="districts"),
    # path("create/", CreateTagAPIView.as_view(), name="create"),
    # path("<int:id>/", DetailTagAPIView.as_view(), name="detail"),
    # path("update/<int:id>/", UpdateTagAPIView.as_view(), name="update"),
    # path("delete/<int:id>/", DeleteTagAPIView.as_view(), name="delete"),
]
