
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ReservationForm = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [tableNumber, setTableNumber] = useState<string>();
  const [capacity, setCapacity] = useState("4");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const tables = Array.from({ length: 10 }, (_, i) => i + 1); // Assuming 10 tables

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make a reservation",
        variant: "destructive",
      });
      return;
    }

    if (!date || !time) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your reservation",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('reservations')
        .insert({
          date: format(date, 'yyyy-MM-dd'),
          time,
          guests: parseInt(guests),
          user_id: user.id,
          table_number: tableNumber ? parseInt(tableNumber) : null,
          capacity: parseInt(capacity),
        });

      if (error) throw error;

      toast({
        title: "Reservation Confirmed",
        description: `Your table for ${guests} on ${format(date, 'PPP')} at ${time} has been reserved.`,
      });

      // Reset form
      setDate(undefined);
      setTime("");
      setGuests("2");
      setTableNumber(undefined);
      setCapacity("4");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create reservation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Table Capacity</Label>
          <Select value={capacity} onValueChange={setCapacity}>
            <SelectTrigger>
              <SelectValue placeholder="Select capacity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 People</SelectItem>
              <SelectItem value="4">4 People</SelectItem>
              <SelectItem value="6">6 People</SelectItem>
              <SelectItem value="8">8 People</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Table Number (Optional)</Label>
        <Select value={tableNumber} onValueChange={setTableNumber}>
          <SelectTrigger>
            <SelectValue placeholder="Select table (optional)" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((table) => (
              <SelectItem key={table} value={table.toString()}>
                Table {table}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gold hover:bg-gold-dark"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Request Reservation"}
      </Button>
    </form>
  );
};
