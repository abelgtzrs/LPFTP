"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Navigation, Car, Bus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InteractiveMap() {
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

  const storeInfo = {
    name: "La Placita FTP",
    address: "1508 Delaware Ave, Fort Pierce, FL 34950",
    phone: "(772) 242-1416",
    coordinates: { lat: 27.443994903731728, lng: -80.33933846257173 },
    hours: {
      monday: "5:00 AM - 9:00 PM",
      tuesday: "5:00 AM - 9:00 PM",
      wednesday: "5:00 AM - 9:00 PM",
      thursday: "5:00 AM - 9:00 PM",
      friday: "5:00 AM - 9:00 PM",
      saturday: "5:00 AM - 9:00 PM",
      sunday: "5:00 AM - 9:00 PM",
    },
  };

  const getCurrentDayHours = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = days[new Date().getDay()];
    return storeInfo.hours[today as keyof typeof storeInfo.hours];
  };

  const isCurrentlyOpen = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    // Simple logic - store is open between 8 AM and 9 PM on weekdays, 8 AM - 8 PM Saturday, 9 AM - 7 PM Sunday
    if (currentDay === 0) return currentHour >= 9 && currentHour < 19; // Sunday
    if (currentDay === 6) return currentHour >= 8 && currentHour < 20; // Saturday
    return currentHour >= 8 && currentHour < 21; // Monday-Friday
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <Card className="border-2 border-gray-200 overflow-hidden">
        <div className="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          {/* Placeholder for actual map */}
          <div className="text-center">
            <MapPin className="h-16 w-16 text-mexican-red mx-auto mb-4" />
            <h3 className="text-xl font-bold font-fiesta text-gray-800">
              Mapa Interactivo
            </h3>
            <p className="text-gray-600 font-common">
              Haz clic en "Ver en Google Maps" para direcciones
            </p>
          </div>

          {/* Store Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-8 h-8 bg-mexican-red rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              <div className="absolute -top-2 -left-2 w-12 h-12 bg-mexican-red/20 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Store Information */}
      <Card className="border-2 border-fiesta-orange/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="font-fiesta text-xl">
              📍 Información de la Tienda
            </span>
            <Badge
              className={`${
                isCurrentlyOpen() ? "bg-green-500" : "bg-red-500"
              } text-white border-0`}
            >
              {isCurrentlyOpen() ? "🟢 Abierto" : "🔴 Cerrado"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-mexican-red mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium font-mexican">{storeInfo.address}</p>
              <p className="text-sm text-gray-600">
                Fácil acceso y estacionamiento gratuito
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-mexican-green flex-shrink-0" />
            <div>
              <p className="font-medium font-mexican">{storeInfo.phone}</p>
              <p className="text-sm text-gray-600">
                Llamadas en español e inglés
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-fiesta-orange mt-1 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium font-mexican">
                Hoy: {getCurrentDayHours()}
              </p>
              <button
                onClick={() =>
                  setSelectedInfo(selectedInfo === "hours" ? null : "hours")
                }
                className="text-sm text-fiesta-orange hover:underline"
              >
                Ver todos los horarios
              </button>

              {selectedInfo === "hours" && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm space-y-1">
                  <div className="grid grid-cols-2 gap-2">
                    <span>Lunes - Viernes:</span>
                    <span>8:00 AM - 9:00 PM</span>
                    <span>Sábado:</span>
                    <span>8:00 AM - 8:00 PM</span>
                    <span>Domingo:</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <Button
              className="bg-gradient-to-r from-mexican-green to-fiesta-lime text-white hover:from-fiesta-lime hover:to-mexican-green"
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${storeInfo.coordinates.lat},${storeInfo.coordinates.lng}`,
                  "_blank"
                )
              }
            >
              <Navigation className="h-4 w-4 mr-2" />
              Cómo Llegar
            </Button>

            <Button
              variant="outline"
              className="border-fiesta-orange text-fiesta-orange hover:bg-fiesta-orange hover:text-white"
              onClick={() => window.open(`tel:${storeInfo.phone}`, "_self")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Llamar Ahora
            </Button>
          </div>

          {/* Transportation Info */}
          <div className="pt-4 border-t">
            <h4 className="font-medium font-fiesta mb-3 text-gray-800">
              🚗 Cómo Llegar
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Car className="h-4 w-4 text-mexican-green" />
                <span>Estacionamiento gratuito disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bus className="h-4 w-4 text-fiesta-orange" />
                <span>Parada de autobús a 2 cuadras</span>
              </div>
            </div>
          </div>

          {/* Special Notes */}
          <div className="bg-fiesta-yellow/10 p-3 rounded-lg">
            <p className="text-sm font-mexican text-gray-700">
              💡 <strong>Tip:</strong> Los fines de semana están más ocupados.
              Te recomendamos venir entre semana para un servicio más rápido.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
