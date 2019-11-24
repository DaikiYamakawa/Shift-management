from django.contrib import admin
from shift_app.models import (Store_registration, Part_time_worker, Skill_list, Learners_list, Period_list, Period_needs_list, Time_list, Skill_count_adjust, Request_work_time)
# Register your models here.
admin.site.register(Store_registration)
admin.site.register(Part_time_worker)
admin.site.register(Skill_list)
admin.site.register(Learners_list)
admin.site.register(Period_list)
admin.site.register(Period_needs_list)
admin.site.register(Time_list)
admin.site.register(Skill_count_adjust)
admin.site.register(Request_work_time)