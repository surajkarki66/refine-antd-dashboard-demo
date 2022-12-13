from django.contrib import admin

from .models import Todo,SubTask

# Register your models here.
class SubTaskInline(admin.StackedInline):
    model = SubTask
    extra = 0
    fields = ["title", "is_completed", "todo"]


class TodoAdmin(admin.ModelAdmin):
    inlines = [SubTaskInline,]
    list_display = ['title','desc','is_completed','owner']
    readonly_fields = ['created_at','updated_at']
    raw_id_fields = ['owner']


admin.site.register(Todo, TodoAdmin)
