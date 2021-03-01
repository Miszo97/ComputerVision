# Generated by Django 3.1.4 on 2021-03-01 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('number_recognition', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModelExample',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drawing_base64', models.TextField()),
                ('label', models.IntegerField()),
                ('converted_image', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='UserExample',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drawing_base64', models.TextField()),
                ('label', models.IntegerField()),
            ],
        ),
        migrations.DeleteModel(
            name='User_Example',
        ),
    ]
