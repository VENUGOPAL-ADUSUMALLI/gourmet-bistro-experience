
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  spicy?: boolean;
  vegetarian?: boolean;
}

export const MenuCard = ({
  name,
  description,
  price,
  image,
  category,
  spicy,
  vegetarian
}: MenuItemProps) => {
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <Card 
      className="menu-item-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          className="w-full bg-gold hover:bg-gold-dark transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </Card>
  );
};
