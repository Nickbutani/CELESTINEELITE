from rest_framework import serializers
from .models import Product, CartItem
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(write_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']

    def create(self, validated_data):
        product_id = validated_data.pop('product_id')
        product = Product.objects.get(id=product_id)
        return CartItem.objects.create(product=product, **validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user