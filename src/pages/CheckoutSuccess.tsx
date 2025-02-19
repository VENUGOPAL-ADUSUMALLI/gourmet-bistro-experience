
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any payment-related state if needed
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-6">
        <div className="flex justify-center">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground max-w-md">
          Thank you for your order. We'll begin preparing your delicious meal right away.
        </p>
        <div className="space-y-4">
          <Button onClick={() => navigate("/")} className="w-full">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
