
import { useState, useEffect } from "react";
import { MenuCard } from "@/components/MenuCard";
import { ReservationForm } from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: cartItemsCount = 0 } = useQuery({
    queryKey: ["cartCount", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("cart_items")
        .select("*", { count: "exact" })
        .eq("user_id", user?.id);
      return count || 0;
    },
    enabled: !!user,
  });

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*');

        if (error) throw error;
        setMenuItems(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load menu items",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, [toast]);

  return (
    <div className="min-h-screen">
      {/* Cart Icon */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center parallax">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="Gourmet dishes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-white px-4 animate-fade-in">
          <h1 className="heading text-5xl md:text-7xl font-bold mb-4">
            Gourmet Bistro
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience culinary excellence in every bite
          </p>
          <Button 
            onClick={() => setActiveTab("reservations")}
            size="lg"
            className="bg-gold hover:bg-gold-dark text-white"
          >
            Make a Reservation
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto py-16 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="heading text-4xl font-bold mb-4">Our Menu</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our carefully curated selection of dishes, prepared with the finest ingredients
              </p>
            </div>
            {loading ? (
              <div className="text-center">Loading menu items...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <MenuCard key={item.id} {...item} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reservations" className="space-y-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="heading text-4xl font-bold mb-4">Make a Reservation</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Book your table online and enjoy a memorable dining experience
              </p>
            </div>
            <Card className="p-6">
              <ReservationForm />
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;

