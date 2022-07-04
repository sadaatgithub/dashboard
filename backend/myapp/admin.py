from django.contrib import admin


from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, pwhadress, FamilyDetails, MedicalDetails, Membership, useradress, Occupational, PatientImage, contact, pwh


# Register your models here.

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2", 'email', 'first_name', 'last_name'),
            },
        ),
    )

class PwhAddressInline(admin.TabularInline):
    model = pwhadress
class PwhContactInline(admin.TabularInline):
    model = contact

class PwhFamilyDetailInline(admin.TabularInline):
    model = FamilyDetails
class PwhOccupationalDetailInline(admin.TabularInline):
    model = Occupational
class PwhMembershipInline(admin.TabularInline):
    model = Membership
class PwhMedicalDetailInline(admin.TabularInline):
    model = MedicalDetails
class PatientimageInline(admin.TabularInline):
    model = PatientImage

# class PatientTagsInline(admin.TabularInline):
#     model = Tags

@admin.register(pwh)
class PwhAdmin(admin.ModelAdmin):
    list_display= ['first_name','last_name']
    list_display_links= ['first_name']
    list_editable = ['last_name']
    list_select_related = ['pwh_address','contact']
    list_per_page = 50
    inlines = [PwhAddressInline,PwhContactInline,PwhOccupationalDetailInline,
                PwhFamilyDetailInline,PwhMembershipInline,
                PwhMedicalDetailInline,PatientimageInline]

admin.site.register(useradress)