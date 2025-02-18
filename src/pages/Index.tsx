
import { useState, useEffect } from "react";
import { MenuCard } from "@/components/MenuCard";
import { ReservationForm } from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center parallax">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="/placeholder.svg"
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
