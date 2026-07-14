import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CalendarDays, LogOut, ChevronRight, Truck, MapPin } from "lucide-react";
import SignOutButton from "./SignOutButton"; // We'll create this client component

export const metadata = {
  title: "My Portal | WE Ice Cream Truck",
};

export default async function PortalPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user as any).role !== "CUSTOMER") {
    redirect("/login?callbackUrl=/portal");
  }

  // Fetch customer bookings
  const bookings = await prisma.booking.findMany({
    where: { customerId: (session.user as any).id },
    include: {
      package: true,
      quote: true,
    },
    orderBy: { eventDate: "desc" },
  });

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-navy font-display">Welcome, {session.user.name?.split(" ")[0]}! 👋</h1>
            <p className="text-gray-500 font-medium mt-1">Manage your legendary events and bookings.</p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/packages"
              className="px-6 py-3 bg-navy text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-coral transition-all"
            >
              New Booking
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-navy/5 border border-navy/5">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
            <CalendarDays className="text-coral" size={28} />
            <h2 className="text-2xl font-black text-navy">My Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">No bookings yet</h3>
              <p className="text-gray-500 font-medium mb-6">Ready to bring the sweet to your next event?</p>
              <Link 
                href="/packages"
                className="inline-block px-8 py-3 bg-coral text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:bg-coral/90 transition-all"
              >
                Browse Packages
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => {
                const isPast = new Date(booking.eventDate) < new Date();
                
                return (
                  <Link 
                    href={`/customer/booking/${booking.id}`} 
                    key={booking.id}
                    className="group block p-6 rounded-2xl border-2 border-gray-100 hover:border-coral transition-all bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-coral/5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-500 font-mono">
                        #{booking.bookingNumber}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === "APPROVED" ? "bg-green-100 text-green-700" :
                        booking.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        booking.status === "REJECTED" ? "bg-red-100 text-red-700" :
                        "bg-gray-200 text-gray-700"
                      }`}>
                        {booking.status}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-navy mb-1">
                      {booking.package?.name || "Custom Event"}
                    </h3>
                    
                    <div className="space-y-2 mt-4 text-sm font-medium text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-coral" />
                        <span className={isPast ? "text-gray-400" : "text-navy font-bold"}>
                          {new Date(booking.eventDate).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at {booking.startTime}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-gray-400 mt-0.5" />
                        <span className="truncate">{booking.city}, {booking.zip}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center group-hover:border-coral/20">
                      <div className="font-black text-navy">
                        ${booking.totalAmount.toFixed(2)}
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-coral opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        View Details <ChevronRight size={16} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
