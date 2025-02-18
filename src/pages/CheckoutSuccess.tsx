
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any cart-related state if needed
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We'll start preparing your delicious meal
          right away!
        </p>
        <div className="space-y-4">
          <Button className="w-full" onClick={() => navigate("/")}>
            Return to Menu
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
