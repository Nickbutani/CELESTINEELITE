from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Product, CartItem, Cart
from .serializers import ProductSerializer, CartItemSerializer, RegisterSerializer
from django.contrib.auth.models import User

# Product APIs
class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# Cart APIs
class CartItemList(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart.items.all()

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer