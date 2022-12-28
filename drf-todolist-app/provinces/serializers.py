from rest_framework.serializers import ModelSerializer
from provinces.models import Province, District

class ProvinceListSerializer(ModelSerializer):
    class Meta:
        model = Province
        fields = "__all__"
        depth = 0

class DistrictListSerializer(ModelSerializer):
    class Meta:
        model = District
        fields = "__all__"
        depth = 0