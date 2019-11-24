from django.db import models
import uuid
from datetime import datetime
# Create your models here.

# class Person(models.Model):

#     MAN = 0
#     WOMAN = 1

#     HOKKAIDO = 0
#     TOHOKU = 5
#     TOKYO = 10
#     CHIBA = 11
#     KANAGAWA = 12
#     SAITAMA = 13
#     TOCHIGI = 14
#     IBARAGI = 15
#     CHUBU = 20
#     KANSAI = 25
#     CHUGOKU = 30
#     SHIKOKU = 35
#     KYUSHU = 40
#     OKINAWA = 45

#     # 名前
#     name = models.CharField(max_length=128)
#     # 誕生日
#     birthday = models.DateTimeField()
#     # 性別
#     sex = models.IntegerField(editable=False)
#     # 出身地
#     address_from = models.IntegerField()
#     # 現住所
#     current_address = models.IntegerField()
#     # メールアドレス
#     email = models.EmailField()


# class Manager(models.Model):

#     # 部署の定数
#     DEP_ACCOUNTING = 0  # 経理
#     DEP_SALES = 5  # 営業
#     DEP_PRODUCTION = 10  # 製造
#     DEP_DEVELOPMENT = 15  # 開発
#     DEP_HR = 20  # 人事
#     DEP_FIN = 25  # 財務
#     DEP_AFFAIRS = 30  # 総務
#     DEP_PLANNING = 35  # 企画
#     DEP_BUSINESS = 40  # 業務
#     DEP_DISTR = 45  # 流通
#     DEP_IS = 50  # 情報システム

#     # 人
#     person = models.ForeignKey('Person', on_delete=models.CASCADE)
#     # 部署
#     department = models.IntegerField()
#     # 着任時期
#     joined_at = models.DateTimeField()
#     # やめた時期
#     quited_at = models.DateTimeField(null=True, blank=True)


# class Worker(models.Model):

#     # 人
#     person = models.ForeignKey('Person', on_delete=models.CASCADE)
#     # 着任時期
#     joined_at = models.DateTimeField()
#     # やめた時期
#     quited_at = models.DateTimeField(null=True, blank=True)
#     # 担当上司
#     manager = models.ForeignKey('Manager', on_delete=models.CASCADE)

class Store_registration(models.Model):
    store_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    store_name = models.CharField(max_length=128)
    opening_time = models.DateTimeField(default=datetime.now)
    closing_time = models.DateTimeField(default=datetime.now)
    place = models.CharField(max_length=128)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)

class Part_time_worker(models.Model):
    worker_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    worker_name = models.CharField(max_length=128)
    work_times = models.IntegerField()
    request_times = models.IntegerField()
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)

class Skill_list(models.Model):
    skill_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    skill_name = models.CharField(max_length=128)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)

class Learners_list(models.Model):
    skill_id = models.ForeignKey('Skill_list', on_delete=models.CASCADE)
    worker_id = models.ForeignKey('Part_time_worker', on_delete=models.CASCADE)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)

class Period_list(models.Model):
    period_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    period_name = models.CharField(max_length=128)
    start_date =  models.DateTimeField(default=datetime.now)
    finish_date =  models.DateTimeField(default=datetime.now)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)

class Period_needs_list(models.Model):
    period_id = models.ForeignKey('Period_list', on_delete=models.CASCADE)
    skill_id = models.ForeignKey('Skill_list', on_delete=models.CASCADE)
    number_of_people = models.IntegerField()
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)

class Time_list(models.Model):
    time_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    time_name = models.CharField(max_length=128)
    opening_time = models.DateTimeField(default=datetime.now)
    closing_time = models.DateTimeField(default=datetime.now)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)

class Skill_count_adjust(models.Model):
    time_id = models.ForeignKey('Time_list', on_delete=models.CASCADE)
    skill_id = models.ForeignKey('skill_list', on_delete=models.CASCADE)
    ajust_count = models.IntegerField()
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)

class Request_work_time(models.Model):
    worker_id = models.ForeignKey('Part_time_worker', on_delete=models.CASCADE)
    date = models.DateTimeField(default=datetime.now)
    start_time = models.DateTimeField(default=datetime.now)
    finish_time = models.DateTimeField(default=datetime.now)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    # timestamp
    update_at = models.DateField(auto_now=True, auto_now_add=False)
