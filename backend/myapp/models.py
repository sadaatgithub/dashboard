from operator import truediv
from django.db import models

from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(unique=True)

    class Meta:
        verbose_name  = 'Chapter'

class pwh(models.Model):
    GENDER_CHOICES = (
        ('M','Male'),
        ('F','Female'),
        ('O','Other'),
        ('ND','Not to Disclosed'),
    )
    RELIGION_CHOICES =(
        ('H','Hindu'),
        ('M','Muslim'),
        ('C','Christian'),
        ('S','Sikh'),
        ('P','Parsi')
    )
    CASTE_CHOICES = (
        ('SC','SC'),
        ('ST','ST'),
        ('OBC','OBC'),
        ('G','General'),
        ('BC','BC'),
        ('FC','FC'),
    )
    TAG_CHOICES =(
        ('Deceased', 'Deceased'),
        ('Transfered', 'Transfered'),
        ('Blocked', 'Blocked'),
        ('Non PwH', 'Non PwH'),
        ('Not Our Member', 'Not Our Member'),
        ('Duplicate', 'Duplicate'),

    )
    id = models.AutoField(primary_key=True)
    chapter = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    first_name = models.CharField(max_length=50, null=True,)
    last_name = models.CharField(max_length=50, null=True,)
    guardian_father_name = models.CharField(max_length=50, null=True,blank=True)
    mothers_name = models.CharField(max_length=50, null=True,blank=True)
    dob = models.DateField(null=True)
    gender = models.CharField(max_length=50,blank=True, null=True,choices=GENDER_CHOICES)
    religion = models.CharField(max_length=50,blank=True, null=True,choices=RELIGION_CHOICES)
    caste = models.CharField(max_length=50,blank=True,null=True, choices=CASTE_CHOICES)
    tag = models.CharField(max_length=20, blank=True, null=True, default='',choices=TAG_CHOICES)


    def __str__(self):
        return self.first_name + " " + self.last_name


class PatientImage(models.Model):
    patient = models.ForeignKey(pwh, on_delete=models.CASCADE, related_name='pwh_images')
    image = models.ImageField(upload_to='pwh/images')

class useradress(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='chapter_address')
    line_1 = models.CharField(max_length=255, null=True)
    line_2 = models.CharField(max_length=255, null=True)
    line_3 = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=50, null=True)
    tahsil = models.CharField(max_length=55, null=True)
    district = models.CharField(max_length=55, null=True)
    state = models.CharField(max_length=30, null=True)
    pincode = models.IntegerField(null=True)

class pwhadress(models.Model):
    ZONE_CHOICES = (
        ('Rural','Rural'),
        ('Urban','Urban')
    )

    id = models.AutoField(primary_key=True)
    patient = models.OneToOneField(pwh, on_delete=models.CASCADE,related_name='pwh_address')
    line_1 = models.CharField(max_length=255, null=True,verbose_name='flat/door/block_no',blank=True, default='')
    line_2 = models.CharField(max_length=255, null=True, verbose_name='premises/buildings/village',blank=True)
    line_3 = models.CharField(max_length=255, null=True, verbose_name='Road/state/po',blank=True)
    city = models.CharField(max_length=50, null=True,blank=True)
    tahsil = models.CharField(max_length=55, null=True,blank=True)
    district = models.CharField(max_length=55, null=True,blank=True)
    state = models.CharField(max_length=30, null=True,blank=True)
    zone = models.CharField(max_length=50,null=True,blank=True,choices=ZONE_CHOICES)
    pincode = models.IntegerField(null=True,blank=True)

    def __str__(self):
        return self.patient.first_name +  "" + self.patient.last_name

class contact(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(pwh,on_delete=models.CASCADE, related_name='contact')
    mobile = models.IntegerField(blank=True, null=True)
    alternate_mobile = models.IntegerField(null=True,blank=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self) -> str:
        return self.user.first_name + " " + self.user.last_name

class Occupational(models.Model):
    id = models.AutoField(primary_key=True)
    pwh = models.OneToOneField(pwh, on_delete=models.CASCADE,related_name='pwh_occupation')
    is_studying = models.BooleanField(null=True, blank=True)
    highest_class = models.CharField(max_length=50,null=True, blank=True)
    is_employed = models.BooleanField(null=True,blank=True)
    employement_type = models.CharField(max_length=50,null=True, blank=True)
    is_reimbursed = models.BooleanField(null=True, blank=True)
    emp_or_name = models.CharField(max_length=50,null=True, blank=True)
    reimbursment_type = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.pwh.first_name

class MedicalDetails(models.Model):
    FACTOR_CHOICES = (
        ('1','1 (I)'),
        ('2','2 (II)'),
        ('3','3 (III)'),
        ('4','4 (FIV)'),
        ('5','5 (FV)'),
        ('6','6 (FVI)'),
        ('7','7 (FVII)'),
        ('8','8 (FVIII)'),
        ('9','9 (FIX)'),
        ('10','10 (FX)'),
        ('11','11 (FXI)'),
        ('12','12 (FXII)'),
        ('13','13 (FXIII)'),
    )
    OTHER_DEFECIANCY = (
        ('VwD','Von Willebrand'),
        ('glanzmann','Glanzmann'),
        ('fibronogenemia','Fibronogenemia'),
        ('hypofibrogenemia','Hypofibrogenemia'),
        ('functional platelate dissorder','Functional Platelete Dissorder'),
        ('disfibronogenemia','Disfibronogenemia'),
    )
    BLOOD_GROUP_CHOICES = (
        ('O+','O +ve'),
        ('O-','O -ve'),
        ('A+','A +ve'),
        ('A-','A -ve'),
        ('B+','B +ve'),
        ('B-','B -ve'),
        ('AB+','AB +ve'),
        ('AB-','AB -ve'),
    )
  
    id = models.AutoField(primary_key=True)
    pwh = models.OneToOneField(pwh, on_delete=models.CASCADE,related_name='pwh_medical')
    age_of_diagnosis = models.CharField(max_length=20, null=True,blank=True)
    hospital_diagnosis = models.CharField(max_length=50,null=True, blank=True)
    blood_group_with_rh = models.CharField(max_length=20,null=True,blank=True,choices=BLOOD_GROUP_CHOICES)
    factor_def = models.CharField(max_length=20,null=True,blank=True,choices=FACTOR_CHOICES)
    factor_level = models.CharField(max_length=20,null=True,blank=True)
    others_def = models.CharField(max_length=50,null=True,blank=True,choices=OTHER_DEFECIANCY)
    is_deformity = models.BooleanField(null=True,blank=True)
    is_inhibitor_pos =  models.BooleanField(null=True,blank=True)
    is_hiv_pos =  models.BooleanField(null=True,blank=True)
    is_hcv_pos =  models.BooleanField(null=True,blank=True)


    def __str__(self):
        return self.pwh.first_name

class FamilyDetails(models.Model):
    id = models.AutoField(primary_key=True)
    pwh = models.OneToOneField(pwh,on_delete=models.CASCADE, related_name='pwh_family')
    no_of_affected = models.IntegerField(null=True, blank=True)
    affected_nhr_id = models.CharField(max_length=20,blank=True,null=True)
    family_income = models.CharField(max_length=20,blank=True,null=True)
    is_bpl = models.BooleanField(null=True,blank=True)
    bpl_ref_no = models.CharField(max_length=20,null=True,blank=True)

    def __str__(self):
        return self.pwh.first_name

class Membership(models.Model):
    id = models.AutoField(primary_key=True)
    pwh = models.OneToOneField(pwh,on_delete=models.CASCADE, related_name='pwh_membership')
    aadhar_member = models.CharField(max_length=20,null=True,blank=True)
    aadhar_father = models.CharField(max_length=20,null=True,blank=True)
    aadhar_mother = models.CharField(max_length=20,null=True,blank=True)
    aadhar_spouce = models.CharField(max_length=20,null=True,blank=True)

    def __str__(self):
        return self.pwh.first_name
