import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  ShoppingBag,
  DollarSign,
  MessageCircle,
  UtensilsCrossed,
  Phone,
  Mail,
  Heart,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FeaturedPromotions from "@/components/featured-promotions";
import FeaturedProducts from "@/components/featured-products";
import FeaturedFood from "@/components/featured-food";
import FacebookPosts from "@/components/facebook-posts";
import InteractiveMap from "@/components/interactive-map";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50 text-gray-800 font-mexican">
      <header className="bg-gradient-to-r from-green-800 via-red-700 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative">
              <img
                src="./assets/logo.png"
                alt="La Placita FTP Logo"
                width={80}
                height={80}
                className="mr-3 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute -top-1 -right-1 bg-fiesta-yellow rounded-full p-1">
                <Heart
                  className="h-4 w-4 text-mexican-red"
                  fill="currentColor"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-fiesta">
                La Placita FTP
              </h1>
              <p className="text-sm opacity-90 font-mexican">
                ¡Tu hogar lejos de casa!
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-colors font-medium"
            >
              🛒 Productos
            </Link>
            <Link
              href="/services"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-colors font-medium"
            >
              Servicios
            </Link>
            <Link
              href="/promotions"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-colors font-medium"
            >
              Promociones
            </Link>
            <Link
              href="/communications"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-colors font-medium"
            >
              Noticias
            </Link>
            <Link
              href="/contact"
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition-colors font-medium"
            >
              Contacto
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-fiesta-orange via-fiesta-yellow to-mexican-red text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-fiesta animate-fiesta-pulse">
              ¡Bienvenidos a La Placita FTP! 🇲🇽
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-mexican">
              Tu mercado mexicano de confianza con productos auténticos, envíos
              de dinero seguros, y el sabor de casa que tanto extrañas. ¡Somos
              tu familia en Estados Unidos!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-mexican-red hover:bg-gray-100 font-bold text-lg px-8 py-4 shadow-lg"
              >
                Ver Productos
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 font-bold text-lg px-8 py-4"
              >
                Enviar Dinero
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-fiesta">
                Productos Destacados
              </h2>
              <p className="text-xl text-gray-600 font-mexican">
                Los favoritos de nuestros clientes
              </p>
            </div>
            <FeaturedProducts />
          </div>
        </section>

        {/* Featured Food */}
        <section className="py-16 bg-gradient-to-r from-tierra-tan/30 to-tierra-sand/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-fiesta">
                Comida Preparada
              </h2>
              <p className="text-xl text-gray-600 font-mexican">
                Platillos caseros listos para llevar
              </p>
            </div>
            <FeaturedFood />
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/50 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-fiesta">
                Nuestros Servicios
              </h2>
              <p className="text-xl text-gray-600 font-mexican">
                Todo lo que necesitas en un solo lugar
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-fiesta-orange/20 hover:border-fiesta-orange transition-colors shadow-lg hover:shadow-xl">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-gradient-to-r from-mexican-green to-fiesta-lime p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <DollarSign className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-fiesta text-mexican-green">
                    Envíos de Dinero
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Rápido, seguro y confiable
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center">
                    Envía dinero a México, Guatemala, El Salvador y más países.
                    ¡Las mejores tarifas y el servicio más rápido de la ciudad!
                  </p>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center bg-fiesta-yellow/20 text-fiesta-orange px-3 py-1 rounded-full text-sm font-bold">
                      <Star className="h-4 w-4 mr-1" fill="currentColor" />
                      Tarifas desde $5
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-mexican-green text-mexican-green hover:bg-mexican-green hover:text-white"
                  >
                    Más Información
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-2 border-mexican-red/20 hover:border-mexican-red transition-colors shadow-lg hover:shadow-xl">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-gradient-to-r from-mexican-red to-fiesta-pink p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-fiesta text-mexican-red">
                    Productos Mexicanos
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Sabores auténticos de casa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center">
                    Chiles, especias, dulces, tortillas frescas, quesos, carnes
                    y todo lo que necesitas para cocinar como en México.
                    ¡Productos frescos todos los días!
                  </p>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center bg-mexican-red/20 text-mexican-red px-3 py-1 rounded-full text-sm font-bold">
                      Productos frescos diarios
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-mexican-red text-mexican-red hover:bg-mexican-red hover:text-white"
                  >
                    Ver Productos
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-2 border-fiesta-orange/20 hover:border-fiesta-orange transition-colors shadow-lg hover:shadow-xl">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-gradient-to-r from-fiesta-orange to-fiesta-yellow p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    <MessageCircle className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-fiesta text-fiesta-orange">
                    Servicios Adicionales
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Todo en un solo lugar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center">
                    Cambio de cheques, recargas telefónicas, pago de servicios,
                    impresiones y fotocopias. ¡Tu centro de servicios de
                    confianza!
                  </p>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center bg-fiesta-orange/20 text-fiesta-orange px-3 py-1 rounded-full text-sm font-bold">
                      ⚡ Servicio inmediato
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-fiesta-orange text-fiesta-orange hover:bg-fiesta-orange hover:text-white"
                  >
                    Más Información
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Promotions */}
        <section className="py-16 bg-gradient-to-r from-tierra-tan/30 to-tierra-sand/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-fiesta">
                Promociones Especiales
              </h2>
              <p className="text-xl text-gray-600 font-mexican">
                ¡Ofertas que no puedes dejar pasar!
              </p>
            </div>
            <FeaturedPromotions />
          </div>
        </section>

        {/* Facebook Posts and Map Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Facebook Posts */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 font-fiesta">
                    Síguenos en Facebook
                  </h2>
                  <p className="text-lg text-gray-600 font-mexican">
                    Mantente al día con nuestras últimas noticias
                  </p>
                </div>
                <FacebookPosts />
              </div>

              {/* Interactive Map */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 font-fiesta">
                    Encuéntranos
                  </h2>
                  <p className="text-lg text-gray-600 font-mexican">
                    Visítanos en nuestra ubicación
                  </p>
                </div>
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>

        {/* Connect With Us */}
        <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-fiesta">
                Conéctate Con Nosotros
              </h2>
              <p className="text-xl text-gray-600 font-mexican">
                Estamos aquí para servirte
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="https://facebook.com" className="group">
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 border-blue-200 hover:border-blue-500 group-hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="mx-auto bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Facebook className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-fiesta">
                      Facebook
                    </h3>
                    <p className="text-gray-600">
                      Síguenos para ofertas exclusivas y noticias de la
                      comunidad
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="https://ubereats.com" className="group">
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 border-green-200 hover:border-green-500 group-hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="mx-auto bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <UtensilsCrossed className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-fiesta">
                      Uber Eats
                    </h3>
                    <p className="text-gray-600">
                      Comida mexicana a domicilio, ¡directo a tu puerta!
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="https://wa.me/1234567890" className="group">
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 border-green-200 hover:border-green-500 group-hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="mx-auto bg-gradient-to-r from-green-400 to-green-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-fiesta">
                      WhatsApp
                    </h3>
                    <p className="text-gray-600">
                      Escríbenos para consultas rápidas y pedidos especiales
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="mailto:info@laplacitaftp.com" className="group">
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-2 border-red-200 hover:border-red-500 group-hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="mx-auto bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-fiesta">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      Envía documentos para imprimir y consultas generales
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 bg-gradient-to-r from-mexican-green/10 via-mexican-red/10 to-fiesta-orange/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-fiesta">
              Más que una tienda, somos familia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 font-mexican">
              En La Placita FTP entendemos lo que significa estar lejos de casa.
              Por eso nos esforzamos cada día para traerte los sabores,
              productos y servicios que te conectan con tus raíces mexicanas.
              ¡Ven y siente el calor de hogar!
            </p>
            <div className="flex justify-center space-x-8 text-6xl"></div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 via-mexican-green/20 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="La Placita FTP Logo"
                  width={50}
                  height={50}
                  className="mr-3 rounded-full border-2 border-fiesta-yellow"
                />
                <div>
                  <h3 className="text-xl font-bold font-fiesta">
                    La Placita FTP
                  </h3>
                  <p className="text-sm opacity-80">Tu hogar lejos de casa</p>
                </div>
              </div>
              <p className="mb-4 text-gray-300">
                Sirviendo a la comunidad hispana desde 2010 con productos
                auténticos y servicios confiables.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://facebook.com"
                  className="hover:text-fiesta-yellow transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 font-fiesta text-fiesta-yellow">
                Horarios
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>Lunes - Viernes: 8am - 9pm</p>
                <p>Sábado: 8am - 8pm</p>
                <p>Domingo: 9am - 7pm</p>
                <p className="text-fiesta-yellow font-bold">
                  ¡Abierto todos los días!
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 font-fiesta text-fiesta-yellow">
                Servicios
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>Envíos de dinero</p>
                <p>roductos mexicanos</p>
                <p>Cambio de cheques</p>
                <p>Recargas telefónicas</p>
                <p>Impresiones y copias</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 font-fiesta text-fiesta-yellow">
                Contacto
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>1508 Delaware Ave</p>
                <p>Fort Pierce, Florida 34950</p>
                <p>(772) 242-1416</p>
                <p>laplacitaftp@gmail.com</p>
                <p className="text-fiesta-yellow">
                  ¡Habla con nosotros en español!
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} La Placita FTP. Todos los
              derechos reservados.
              <span className="text-fiesta-yellow">
                {" "}
                Hecho con ❤️ para la comunidad hispana.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
