from rest_framework.generics import ListAPIView
from .serializers import ProvinceListSerializer, DistrictListSerializer
from .models import Province, District


class ProvinceListView(ListAPIView):
    serializer_class = ProvinceListSerializer
    queryset = Province.objects.all()


class DistrictListView(ListAPIView):
    serializer_class = DistrictListSerializer
    
    def get_queryset(self):
        return District.objects.filter(province=self.kwargs['province_id'])