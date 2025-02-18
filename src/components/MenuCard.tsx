
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  spicy?: boolean;
  vegetarian?: boolean;
}

export const MenuCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  spicy,
  vegetarian
}: MenuItemProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to your cart",
      });
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .insert([
          {
            user_id: user.id,
            menu_item_id: id,
            quantity: 1
          }
        ]);

      if (error) throw error;

      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      className="menu-item-card"
    >
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="heading text-xl font-semibold">{name}</h3>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary">{category}</Badge>
              {spicy && <Badge variant="destructive">Spicy</Badge>}
              {vegetarian && <Badge variant="outline">Vegetarian</Badge>}
            </div>
          </div>
          <span className="heading text-lg font-semibold text-gold">${price}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <Button 
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full bg-gold hover:bg-gold-dark transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" /> 
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
};
