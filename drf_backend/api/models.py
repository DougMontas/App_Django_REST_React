from django.db import models
class Todo(models.Model):
    
    tasks = models.CharField(max_length=200, null=False, blank=False)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tasks