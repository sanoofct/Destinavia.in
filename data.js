// DESTINAVIA - Mock Database Layer (data.js)
// Structured to allow easy transition to REST APIs / Database connections later.

const DESTINAVIA_DATA = {
  destinations: [
    {
      id: "kashmir",
      name: "Kashmir",
      category: "domestic",
      tagline: "Paradise on Earth",
      image: "Img/gallery_kashmir.jpg",
      packagesCount: 18,
      weather: "16°C • Sunny",
      description: "Experience serene shikara rides, snow-capped peaks, and warm hospitality in the valley."
    },
    {
      id: "kerala",
      name: "Kerala",
      category: "domestic",
      tagline: "God's Own Country",
      image: "Img/gallery_kerala.jpg",
      packagesCount: 22,
      weather: "28°C • Humid",
      description: "Cruise along peaceful backwaters on luxury houseboats amidst endless green coconut groves."
    },
    {
      id: "rajasthan",
      name: "Rajasthan",
      category: "domestic",
      tagline: "Land of Kings",
      image: "Img/gallery_rajasthan.jpg",
      packagesCount: 15,
      weather: "32°C • Clear",
      description: "Step into a golden era of grand palaces, mighty forts, and colorful desert festivals."
    },
    {
      id: "ladakh",
      name: "Ladakh",
      category: "domestic",
      tagline: "The Land of High Passes",
      image: "Img/blog_ladakh.jpg",
      packagesCount: 12,
      weather: "12°C • Windy",
      description: "An adventurer's dream with deep blue lakes, barren valleys, and spiritual monasteries."
    },
    {
      id: "goa",
      name: "Goa",
      category: "domestic",
      tagline: "Sunkissed Paradise",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      packagesCount: 25,
      weather: "30°C • Sunny",
      description: "Relax on golden sands, explore historic churches, and dive into vibrant nightlife."
    },
    {
      id: "dubai",
      name: "Dubai",
      category: "international",
      tagline: "Future of Luxury",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      packagesCount: 20,
      weather: "36°C • Hot",
      description: "Gaze at skyscrapers, experience desert safaris, and shop at ultra-modern mega malls."
    },
    {
      id: "bali",
      name: "Bali",
      category: "international",
      tagline: "Island of the Gods",
      image: "Img/gallery_bali.jpg",
      packagesCount: 24,
      weather: "27°C • Tropical",
      description: "Find spiritual healing, surf world-class waves, and visit ancient clifftop temples."
    },
    {
      id: "thailand",
      name: "Thailand",
      category: "international",
      tagline: "Land of Smiles",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
      packagesCount: 30,
      weather: "29°C • Clear",
      description: "Explore golden temples, pristine beaches, and bustling street markets filled with flavor."
    },
    {
      id: "vietnam",
      name: "Vietnam",
      category: "international",
      tagline: "Timeless Charm",
      image: "Img/blog_vietnam.jpg",
      packagesCount: 16,
      weather: "25°C • Cloudy",
      description: "Sail through limestone karsts in Halong Bay and walk through lantern-lit historic towns."
    },
    {
      id: "europe",
      name: "Europe",
      category: "international",
      tagline: "Grand Heritage & Romance",
      image: "https://images.unsplash.com/photo-1473951574080-01fe45ec8643?auto=format&fit=crop&w=800&q=80",
      packagesCount: 35,
      weather: "18°C • Mild",
      description: "Wander through romantic streets, iconic monuments, and breathtaking alpine landscapes."
    },
    {
      id: "japan",
      name: "Japan",
      category: "international",
      tagline: "Tradition Meets Innovation",
      image: "Img/blog_japan.jpg",
      packagesCount: 14,
      weather: "15°C • Pleasant",
      description: "Witness neon-lit cities, historical shrines, and stunning cherry blossoms in spring."
    }
  ],

  packages: [
    {
      id: "kashmir-luxury-escape",
      title: "Royal Kashmir Luxury Escape",
      destination: "Kashmir",
      destinationId: "kashmir",
      priceINR: 68000,
      rating: 4.9,
      reviewsCount: 142,
      durationDays: 6,
      durationNights: 5,
      category: "Honeymoon",
      image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80",
      inclusions: ["5-Star Resort Stay", "Private Shikara Ride", "All Meals Included", "Helicopter Ride Ticket", "Luxury Car Transfer"],
      highlights: ["Luxury houseboat stay in Srinagar", "Skiing experience in Gulmarg", "Private romantic dinner by Dal Lake"],
      badge: "Best Seller"
    },
    {
      id: "bali-romantic-heaven",
      title: "Bali Honeymoon Bliss & Private Pool Villas",
      destination: "Bali",
      destinationId: "bali",
      priceINR: 82000,
      rating: 4.8,
      reviewsCount: 96,
      durationDays: 7,
      durationNights: 6,
      category: "Honeymoon",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      inclusions: ["Private Pool Villa", "Floating Breakfast", "Spa Couples Massage", "Speedboat to Nusa Penida", "English Speaking Guide"],
      highlights: ["Ubud jungle swing & rice terrace tour", "Sunset temple tour at Uluwatu", "Romantic dinner in a beach cave"],
      badge: "Luxury Favorite"
    },
    {
      id: "kerala-backwater-cruise",
      title: "Kerala Backwaters & Hill Station Luxury",
      destination: "Kerala",
      destinationId: "kerala",
      priceINR: 48000,
      rating: 4.7,
      reviewsCount: 118,
      durationDays: 5,
      durationNights: 4,
      category: "Family",
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      inclusions: ["Luxury Munnar Resort", "Private Houseboat Charter", "Spice Plantation Tour", "Kathakali Cultural Show", "Daily Breakfast"],
      highlights: ["Watch tea pluckers in Munnar hills", "Overnight cruise with chef on board", "Ayurvedic massage session"],
      badge: "Popular"
    },
    {
      id: "dubai-ultra-modern",
      title: "Dubai Sky Heights & Desert Dune Adventure",
      destination: "Dubai",
      destinationId: "dubai",
      priceINR: 75000,
      rating: 4.9,
      reviewsCount: 205,
      durationDays: 6,
      durationNights: 5,
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      inclusions: ["Burj Khalifa 124th Floor", "Desert Dune Bashing", "Marina Dhow Dinner Cruise", "Museum of Future Ticket", "Premium Hotels"],
      highlights: ["Premium 4x4 dune safari with BBQ dinner", "Access to Aquaventure Waterpark", "VIP lounge entry at Burj Khalifa"],
      badge: "Trending"
    },
    {
      id: "corporate-summit-goa",
      title: "Corporate Leadership Retreat & Team Building",
      destination: "Goa",
      destinationId: "goa",
      priceINR: 35000,
      rating: 4.9,
      reviewsCount: 48,
      durationDays: 4,
      durationNights: 3,
      category: "Corporate",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      inclusions: ["5-Star Beach Resort", "Conference Hall Access", "Team Building Workshops", "Gala Yacht Dinner", "GST Invoice Support"],
      highlights: ["Exclusive sunset yacht rental", "Beachside corporate games", "Keynote session by industry leaders"],
      badge: "Corporate Elite"
    },
    {
      id: "industrial-visit-bangalore",
      title: "Tech & Aero Industrial Visit - 120 Students",
      destination: "India",
      destinationId: "rajasthan", // placeholder destination ID
      priceINR: 12500,
      rating: 4.8,
      reviewsCount: 34,
      durationDays: 5,
      durationNights: 4,
      category: "Industrial Visits",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      inclusions: ["3-Star Quad Sharing Rooms", "A/C Sleeper Buses", "Factory Permission Entry", "Industrial Guide & Faculty", "Academic Certificates"],
      highlights: ["Visit to HAL aerospace facility", "Interactive workshop at ISRO exhibition", "Automation plant walkthrough"],
      badge: "Educational"
    },
    {
      id: "swiss-alps-romantic",
      title: "Scenic Swiss Alps & Paris Grand Romance",
      destination: "Europe",
      destinationId: "europe",
      priceINR: 185000,
      rating: 4.95,
      reviewsCount: 76,
      durationDays: 9,
      durationNights: 8,
      category: "Honeymoon",
      image: "https://images.unsplash.com/photo-1473951574080-01fe45ec8643?auto=format&fit=crop&w=800&q=80",
      inclusions: ["First-Class Swiss Rail Pass", "Eiffel Tower Dinner", "Mount Titlis Cable Car", "Seine River Cruise", "Luxury Boutique Hotels"],
      highlights: ["Panoramic train ride on Glacier Express", "Private photoshoot at Eiffel Tower", "Stay in a Swiss alpine chalet"],
      badge: "Signature Collection"
    },
    {
      id: "japan-cherry-blossom",
      title: "Japan Spring Cherry Blossoms & Bullet Train",
      destination: "Japan",
      destinationId: "japan",
      priceINR: 165000,
      rating: 4.92,
      reviewsCount: 63,
      durationDays: 8,
      durationNights: 7,
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      inclusions: ["JR Bullet Train Pass", "English-speaking Local Guide", "Tea Ceremony Experience", "Hot Spring Ryokan Stay", "Authentic Kaiseki Dinners"],
      highlights: ["Stroll through Kyoto's bamboo forests", "Mount Fuji view from Lake Kawaguchi", "Neon food tour in Shinjuku, Tokyo"],
      badge: "Limited Availability"
    },
    {
      id: "varanasi-amritsar-spiritual",
      title: "Sacred Heritage & Spiritual Trail: Varanasi & Golden Temple",
      destination: "India",
      destinationId: "rajasthan",
      priceINR: 32000,
      rating: 4.9,
      reviewsCount: 88,
      durationDays: 5,
      durationNights: 4,
      category: "Pilgrimage",
      image: "Img/gallery_goldentemple.jpg",
      inclusions: ["VIP Temple Darshan Passes", "Private Ganga Aarti Boat", "Heritage Haveli Stay", "All Vegetarian Meals", "Dedicated Spiritual Guide"],
      highlights: ["Sunrise boat cruise along sacred Ganges ghats", "Evening Ganga Aarti ceremony at Dashashwamedh", "Golden Temple Palki Sahib ceremony & community Langar"],
      badge: "Spiritual Exclusive"
    }
  ],

  testimonials: [
    {
      name: "Dr. Anirudh Sharma",
      role: "Dean of Engineering, SRM University",
      text: "Organized an industrial visit for 120 mechanical engineering students to Bangalore. Destinavia managed the factory approvals, luxury buses, and accommodation flawlessly. A gold standard in student travel management.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      videoUrl: null
    },
    {
      name: "Priya & Rohan Mehta",
      role: "Honeymooners (Delhi)",
      text: "Our Kashmir trip was an absolute dream. The luxury houseboat was beautiful, and the private dinners were unforgettable. The 24/7 concierge took care of every request instantly.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Sample stock video to demonstrate video capability
    },
    {
      name: "Vikram Malhotra",
      role: "VP of HR, TechCorp Solutions",
      text: "Destinavia designed our annual corporate leadership retreat in Goa. The team building games on the private yacht and the beach gala were perfectly integrated. Extremely professional and fully GST compliant.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
      videoUrl: null
    },
    {
      name: "Sanya Sen",
      role: "Solo Traveler (Kolkata)",
      text: "Traveling solo to Bali for the first time was daunting, but Destinavia made it incredibly safe and enjoyable. The customized itinerary was perfect, balancing yoga retreats with adventure treks.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
      videoUrl: null
    },
    {
      name: "Aarav & Meera Patel",
      role: "Honeymooners (Mumbai)",
      text: "Our Kerala houseboat experience was outstanding. Destinavia customized every detail, from the rose-petal setup to the private chef. Absolutely wonderful!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      videoUrl: null
    },
    {
      name: "Neha Kapoor",
      role: "Solo Traveler (Bangalore)",
      text: "As a solo female traveler in Japan, safety was my priority. Destinavia provided 24/7 concierge support, pocket Wi-Fi, and detailed transit guides that made the journey completely stress-free.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      videoUrl: null
    },
    {
      name: "Aditya Verma",
      role: "CEO, V-Tech Group",
      text: "Organized a corporate retreat for 50 leadership team members in Dubai. The dune bashing and VIP private lounge experiences were handled with exceptional professionalism. Outstanding execution.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      videoUrl: null
    },
    {
      name: "Prof. Rajesh Iyer",
      role: "Faculty Coordinator, IIT Madras",
      text: "Managed a massive educational visit to Kashmir for 80 students. From group flight bookings to daily security briefs and meals, Destinavia exceeded expectations in every aspect of coordination.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
      videoUrl: null
    },
    {
      name: "Sneha & Amit Joshi",
      role: "Family Group (Pune)",
      text: "Our multi-city Europe tour was organized brilliantly. The boutique hotels were in prime locations and the pre-booked high-speed train tickets made travel between cities absolutely seamless.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80",
      videoUrl: null
    }
  ],

  blogs: [
    {
      id: "ladakh-permit-guide",
      title: "Ladakh Travel Guide: High-Altitude Acclimatization & Inner Line Permits",
      category: "Permit & Health",
      date: "August 15, 2026",
      readTime: "5 min read",
      summary: "Essential advice on obtaining Inner Line Permits (ILP), dealing with altitude sickness in Leh, and packing oxygen gear for Pangong.",
      image: "Img/blog_ladakh.jpg"
    },
    {
      id: "kashmir-packing-tips",
      title: "What to Pack for Kashmir: Ultimate Seasonal Checklist",
      category: "Packing Guide",
      date: "July 28, 2026",
      readTime: "6 min read",
      summary: "Prepare for sunny Shikara rides and chilly Gulmarg slopes. Here's what thermal layers, boots, and gear you must carry.",
      image: "Img/gallery_kashmir.jpg"
    },
    {
      id: "kerala-houseboat-guide",
      title: "First-Timer’s Guide to Kerala Houseboats & Monsoon Wellness",
      category: "Luxury Stays",
      date: "August 8, 2026",
      readTime: "5 min read",
      summary: "Choosing between day cruises and overnight houseboats in Alleppey, booking authentic Ayurveda retreats, and cruising lush backwaters.",
      image: "Img/gallery_kerala.jpg"
    },
    {
      id: "rajasthan-heritage-guide",
      title: "Royal Rajasthan: Heritage Haveli Stays & Desert Safari Secrets",
      category: "Heritage Guide",
      date: "August 2, 2026",
      readTime: "6 min read",
      summary: "How to plan the royal circuit across Jaipur, Jodhpur, and Jaisalmer with boutique palace stays, dune camping, and cultural tours.",
      image: "Img/gallery_hawamahal.jpg"
    },
    {
      id: "varanasi-ghats-guide",
      title: "Spiritual Journey: Navigating Varanasi Ghats & Evening Ganga Aarti",
      category: "Cultural Etiquette",
      date: "July 20, 2026",
      readTime: "5 min read",
      summary: "Insider tips on sunrise boat rides along the sacred Ganges, best vantage spots for the Dashashwamedh Aarti, and etiquette.",
      image: "Img/blog_varanasi.jpg"
    },
    {
      id: "amritsar-golden-temple",
      title: "Golden Temple Amritsar: Complete Visitor Guide & Langar Traditions",
      category: "Spiritual Guide",
      date: "July 12, 2026",
      readTime: "4 min read",
      summary: "Everything you need to know about head coverings, early morning Palki Sahib ceremonies, participating in community Langar, and night views.",
      image: "Img/gallery_goldentemple.jpg"
    }
  ],

  faqs: [
    {
      question: "Are your packages fully customizable?",
      answer: "Absolutely! Every traveler is unique, and so are our itineraries. We can fully tailor your trip—from flight preferences and accommodation styles to daily activities and dining choices—to match your exact budget and travel goals."
    },
    {
      question: "How does Destinavia support group bookings like industrial visits and college tours?",
      answer: "We offer end-to-end management for group trips, including custom itineraries, group-rate accommodations, bulk transport, industrial access permissions, and dedicated trip coordinators to keep everything running smoothly and safely on the ground."
    },
    {
      question: "What is your refund and cancellation policy?",
      answer: "Cancellation policies vary depending on your trip details and supplier rules (airlines, hotels, local vendors). We always strive to provide flexible cancellation terms and will clearly outline any non-refundable deposits before you confirm your booking."
    },
    {
      question: "Do you assist with international visas?",
      answer: "Yes! Our team guides you through the entire visa application process, helping you prepare the correct documentation, schedule appointment slots, and submit your paperwork for a hassle-free approval process."
    },
    {
      question: "Can I book flights and hotels together as a package?",
      answer: "Yes! Bundling your flights and hotels into a single package is the best way to save time and secure exclusive bundled rates. We can also add airport transfers and activities to complete your journey."
    },
    {
      question: "Do you offer 24/7 emergency support?",
      answer: "Yes. Whenever you are on a trip booked through Destinavia, you have access to a dedicated 24/7 support manager to assist with travel delays, emergency rebookings, or any urgent inquiries."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, net banking, UPI, wire transfers, and popular digital wallets. For larger custom packages, we also offer structured payment plans upon request."
    },
    {
      question: "Are flight tickets included in the package prices?",
      answer: "It depends on your preference! We offer both land-only packages and all-inclusive flight-plus-land packages. The exact breakdown will always be clearly listed before you confirm your booking."
    }
  ],

  partners: {
    airlines: ["Emirates", "Singapore Airlines", "Indigo", "Qatar Airways", "Air India", "British Airways"],
    hotels: ["Taj Hotels", "Marriott International", "The Oberoi Group", "Hyatt Hotels", "Hilton Worldwide"],
    trustBadges: [
      { name: "GST Registered", desc: "Tax Compliant" },
      { name: "IATA Certified", desc: "Global Standards" },
      { name: "Secure Gateway", desc: "PCI-DSS Compliant Payments" },
      { name: "24/7 Support", desc: "Dedicated Helpline" }
    ]
  }
};
