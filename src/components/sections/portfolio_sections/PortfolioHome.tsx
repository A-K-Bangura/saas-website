// import { useState } from "react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Container } from "@/components/ui/container";
// // import { Section } from "@/components/ui/section";
// // import {
// //   TypographyH2,
// //   TypographyH3,
// //   TypographyP,
// // } from "@/components/ui/typography";
// import { FiExternalLink, FiMapPin } from "react-icons/fi";
// import { useGsapScrollTrigger } from "@/src/hooks/use-gsap-scroll-trigger";
// import { Section } from "../../ui/Section";
// import { Container } from "../../ui/Container";
// import { TypographyH2, TypographyH3, TypographyP } from "../../ui/Typography";
// import { Button } from "../../ui/Button";
// import { Card, CardContent } from "../../ui/Card";
// import { Badge } from "../../ui/Badge";

// const projects = [
//   {
//     id: 1,
//     title: "Eco-Friendly Family Home",
//     category: "Residential",
//     location: "Freetown, Sierra Leone",
//     image: "/modern-sustainable-family-home-architecture.jpg",
//     description:
//       "A 3-bedroom sustainable home featuring solar panels, rainwater harvesting, and locally sourced materials.",
//     features: ["Solar Energy", "Rainwater Harvesting", "Local Materials"],
//     year: "2024",
//   },
//   {
//     id: 2,
//     title: "Community Health Center",
//     category: "Commercial",
//     location: "Bo, Sierra Leone",
//     image: "/modern-health-center-building-architecture.jpg",
//     description:
//       "A modern healthcare facility designed for accessibility and energy efficiency in rural communities.",
//     features: [
//       "Accessible Design",
//       "Natural Ventilation",
//       "Modular Construction",
//     ],
//     year: "2023",
//   },
//   {
//     id: 3,
//     title: "Sustainable School Complex",
//     category: "Educational",
//     location: "Kenema, Sierra Leone",
//     image: "/sustainable-school-building-architecture.jpg",
//     description:
//       "Educational facility with passive cooling, natural lighting, and flexible classroom spaces.",
//     features: ["Passive Cooling", "Natural Lighting", "Flexible Spaces"],
//     year: "2023",
//   },
//   {
//     id: 4,
//     title: "Green Office Building",
//     category: "Commercial",
//     location: "Freetown, Sierra Leone",
//     image: "/green-office-building-sustainable-architecture.jpg",
//     description:
//       "Modern office space incorporating green walls, energy-efficient systems, and sustainable materials.",
//     features: ["Green Walls", "Energy Efficient", "Sustainable Materials"],
//     year: "2024",
//   },
// ];

// const categories = ["All", "Residential", "Commercial", "Educational"];

// export function Portfolio() {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const portfolioRef = useGsapScrollTrigger({ y: 50, stagger: 0.15 });

//   const filteredProjects =
//     activeCategory === "All"
//       ? projects
//       : projects.filter((project) => project.category === activeCategory);

//   return (
//     <Section>
//       <Container>
//         <div className="text-center mb-16">
//           <TypographyH2 className="mb-4">Our Portfolio</TypographyH2>
//           <TypographyP className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
//             Explore our completed projects showcasing sustainable and innovative
//             architectural solutions across Sierra Leone.
//           </TypographyP>

//           {/* Category Filter */}
//           <div className="flex flex-wrap justify-center gap-2">
//             {categories.map((category) => (
//               <Button
//                 key={category}
//                 variant={activeCategory === category ? "default" : "outline"}
//                 onClick={() => setActiveCategory(category)}
//                 className="mb-4 transition-all duration-300 hover:scale-105"
//               >
//                 {category}
//               </Button>
//             ))}
//           </div>
//         </div>

//         <div
//           ref={portfolioRef}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8"
//         >
//           {filteredProjects.map((project) => (
//             <Card
//               key={project.id}
//               className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
//             >
//               <div className="relative overflow-hidden">
//                 <img
//                   src={project.image || "/placeholder.svg"}
//                   alt={project.title}
//                   className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
//                 <div className="absolute top-4 left-4">
//                   <Badge
//                     variant="secondary"
//                     className="transition-transform duration-300 group-hover:scale-105"
//                   >
//                     {project.category}
//                   </Badge>
//                 </div>
//                 <div className="absolute top-4 right-4">
//                   <Badge
//                     variant="outline"
//                     className="bg-background/80 backdrop-blur transition-transform duration-300 group-hover:scale-105"
//                   >
//                     {project.year}
//                   </Badge>
//                 </div>
//               </div>

//               <CardContent className="p-6">
//                 <TypographyH3 className="mb-2 group-hover:text-accent transition-colors duration-300">
//                   {project.title}
//                 </TypographyH3>

//                 <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
//                   <FiMapPin className="w-4 h-4" />
//                   <span>{project.location}</span>
//                 </div>

//                 <TypographyP className="text-muted-foreground mb-4">
//                   {project.description}
//                 </TypographyP>

//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.features.map((feature, index) => (
//                     <Badge
//                       key={index}
//                       variant="outline"
//                       className="text-xs transition-colors duration-300 group-hover:border-accent"
//                     >
//                       {feature}
//                     </Badge>
//                   ))}
//                 </div>

//                 <Button
//                   variant="outline"
//                   className="w-full group bg-transparent transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
//                 >
//                   View Project Details
//                   <FiExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </Container>
//     </Section>
//   );
// }
