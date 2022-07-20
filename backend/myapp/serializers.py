from rest_framework import serializers
from djoser.serializers import UserSerializer as BaseUserSerializer
from myapp.models import FamilyDetails, MedicalDetails, Membership, Occupational, PatientImage, User, contact, pwh, pwhadress, useradress




class addressSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = pwhadress
        # fields = ['id','line_1','line_2','line_3','city','tahsil','district','state','pincode']
        
        exclude = ['patient']
class contactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = contact
        # fields = '__all__'
        exclude = ['user']

class occupationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Occupational
        exclude = ['pwh']

class membershipSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Membership
        exclude = ['pwh']

class familySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = FamilyDetails
        exclude = ['pwh']

class PwhTagSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(required=False)
    class Meta:
        model = pwh
        fields = ['tag']

    def create(self,validated_data):
        # print(validated_data)
        patient_id = self.context['patient_id']
        tag = validated_data.pop('tag')
        return pwh.objects.filter(id=patient_id).update(tag=tag)

class medicalSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = MedicalDetails
        exclude = ['pwh']

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']
class PatientImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    def create(self, validated_data):
        patient_id = self.context['patient_id']
        return PatientImage.objects.create(patient_id=patient_id, **validated_data)
    class Meta:
        model = PatientImage
        fields = ['id', 'image']


class PwhSerializer(serializers.ModelSerializer):
    pwh_address = addressSerializer()
    contact = contactSerializer()
    pwh_family = familySerializer()
    pwh_medical = medicalSerializer()
    pwh_occupation = occupationSerializer()
    pwh_membership = membershipSerializer()
    pwh_images = PatientImageSerializer(many=True, read_only=True)

    class Meta:
        model = pwh
        fields = ['id',
                    'first_name', 'last_name',
                    'guardian_father_name', 'mothers_name','dob',
                   'gender','religion','caste',
                    'pwh_address','contact','pwh_family','pwh_medical','pwh_occupation','pwh_membership','pwh_images','tag']
        # depth = 1
        # fields = '__all__'
    
    def create(self, validated_data):
        print(validated_data)
        address_data = validated_data.pop('pwh_address')
        contact_data = validated_data.pop('contact')
        family_data = validated_data.pop('pwh_family')
        medical_data = validated_data.pop('pwh_medical')
        occupation_data = validated_data.pop('pwh_occupation')
        membership_data = validated_data.pop('pwh_membership')

        chapter_id = self.context['user_id']

        chapter = User.objects.get(id=chapter_id)
        pwhData = pwh.objects.create(chapter=chapter,**validated_data)
    
        pwhadress.objects.create(patient=pwhData,**address_data)
        
        contact.objects.create(user=pwhData, **contact_data)
        FamilyDetails.objects.create(pwh=pwhData, **family_data)
        Occupational.objects.create(pwh=pwhData, **occupation_data)
        MedicalDetails.objects.create(pwh=pwhData, **medical_data)
        Membership.objects.create(pwh=pwhData,**membership_data)
        return pwhData

    def update(self, instance, validated_data):
   
        address_data =validated_data.pop('pwh_address')
        contact_data = validated_data.pop('contact')
        family_data = validated_data.pop('pwh_family')
        medical_data = validated_data.pop('pwh_medical')
        occupation_data = validated_data.pop('pwh_occupation')
        membership_data = validated_data.pop('pwh_membership')

       
        add_id = address_data.pop('id')
        contact_id = contact_data.pop('id')
        family_id = family_data.pop('id')
        occupation_id = occupation_data.pop('id')
        membership_id = membership_data.pop('id')
        medical_id = medical_data.pop('id')
      

        pwh_id= instance.id
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.guardian_father_name = validated_data.get('guardian_father_name', instance.guardian_father_name)
        instance.mothers_name = validated_data.get('mothers_name', instance.mothers_name)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.caste = validated_data.get('caste', instance.caste)
        instance.dob = validated_data.get('dob', instance.dob)
        instance.religion = validated_data.get('religion', instance.religion)
        instance.save()
        if pwhadress.objects.filter(patient=pwh_id,id=add_id).exists():
            pwhadress.objects.filter(patient=pwh_id,id=add_id).update(**address_data)
        if contact.objects.filter(user=pwh_id,id=contact_id).exists():
            contact.objects.filter(user=pwh_id,id=contact_id).update(**contact_data)

        if FamilyDetails.objects.filter(pwh=pwh_id,id=family_id).exists():
            family = FamilyDetails.objects.filter(pwh=pwh_id,id=family_id)
            family.update(**family_data)

        if Occupational.objects.filter(pwh=pwh_id,id=occupation_id).exists():
            Occupational.objects.filter(pwh=pwh_id,id=occupation_id).update(**occupation_data)

        if MedicalDetails.objects.filter(pwh=pwh_id,id=medical_id).exists():
            MedicalDetails.objects.filter(pwh=pwh_id,id=medical_id).update(**medical_data)

        if Membership.objects.filter(pwh=pwh_id,id=membership_id).exists():
            Membership.objects.filter(pwh=pwh_id,id=membership_id).update(**membership_data)
        
        return instance
        
class ChapterSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = useradress
        # fields = '__all__'
        exclude = ['user']

class UserSerializer(BaseUserSerializer):
    chapter_address = ChapterSerializer()
    class Meta(BaseUserSerializer.Meta):
        fields = ['id','first_name','last_name','chapter_address']
        # depth = 1

    def update(self,instance,validated_data):

        chapter_address = validated_data.pop('chapter_address')
        chapter_address_id = chapter_address.pop('id')
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        if useradress.objects.filter(user=instance.id, id=chapter_address_id).exists():
            useradress.objects.filter(user=instance.id, id=chapter_address_id).update(**chapter_address)
        return instance