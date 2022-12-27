from django.db import models
from helpers.models import TrackingModel
   
   
class Province(TrackingModel):
    name   = models.CharField(max_length=255, unique=True)      
    
    def __str__(self):         
        return self.name 
        
        
class District(TrackingModel):
    name   = models.CharField(max_length=255, unique=True)     
    province = models.ForeignKey(Province, on_delete=models.PROTECT)      
    
    def __str__(self):         
        return self.name 