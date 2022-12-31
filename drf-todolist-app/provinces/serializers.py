from rest_framework.serializers import ModelSerializer
from provinces.models import Province, District


class DistrictListSerializer(ModelSerializer):
    class Meta:
        model = District
        fields = "__all__"
        depth = 0


class ProvinceListSerializer(ModelSerializer):
    districts = DistrictListSerializer(many=True, read_only=True)
    class Meta:
        model = Province
        fields = ["id", "name", "districts"] 

