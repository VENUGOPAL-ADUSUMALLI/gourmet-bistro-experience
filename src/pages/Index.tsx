
import { useState } from "react";
import { MenuCard } from "@/components/MenuCard";
import { ReservationForm } from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const menuItems = [
  {
    name: "Truffle Risotto",
    description: "Creamy Arborio rice with black truffle and aged Parmesan",
    price: 28,
    image: "/placeholder.svg",
    category: "Mains",
    vegetarian: true
  },
  {
    name: "Wagyu Steak",
    description: "Grade A5 Japanese Wagyu with roasted vegetables",
    price: 45,
    image: "/placeholder.svg",
    category: "Mains"
  },
  {
    name: "Lobster Thermidor",
    description: "Fresh Maine lobster in a rich brandy cream sauce",
    price: 42,
    image: "/placeholder.svg",
    category: "Seafood"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("menu");

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <MenuCard key={item.name} {...item} />
              ))}
            </div>
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
