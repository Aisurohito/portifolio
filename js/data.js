// js/data.js
"use strict";

window.PORTFOLIO_DATA = {
  categories: [
    { id: "all", label: "Todos" },
    { id: "landing", label: "Landing" },
    { id: "ecom", label: "E-commerce" },        // <- era "shop"
    { id: "webapp", label: "Web App" },
    { id: "blog", label: "Blog" },
    { id: "portfolio", label: "Portfólios" },
    { id: "institucional", label: "Institucional" } // <- novo
  ],

  projects: [
    {
      id: "titanmetal",
      title: "TitanMetal",
      category: "Institucional",
      desc: "Institucional com foco em apresentação direta e valoes de trabalho",
      tech: ["HTML"],
      thumb: "../assets/thumb/titanmetal.png",
      live: "https://aisurohito.github.io/Sites-metalurgica/",
      repo: "#",
      status: "Demonstração"
    },

    {
      id: "bellamoda",
      title: "Bella Moda",
      category: "Institucional",
      desc: "Institucional com apresentação de surgimento e conquistas",
      tech: ["HTML"],
      thumb: "../assets/thumb/bellamoda.png",
      live: "https://aisurohito.github.io/Sites-loja-de-roupa/",
      repo: "#",
      status: "Demonstração"
    },

    {
      id: "techsolutions",
      title: "TechSolutions",
      category: "Institucional",
      desc: "Institucional com apresentação de surgimento, Propósito e serviços",
      tech: ["HTML"],
      thumb: "../assets/thumb/techsolutions.png",
      live: "https://aisurohito.github.io/Site-Tech/",
      repo: "#",
      status: "Demonstração"
    },

    {
      id: "atlasfit",
      title: "AtlasFit",
      category: "E-Commerce",
      desc: "E-Commerce com focom em apresentação direta de produtos, layout criativo e chamativo",
      tech: ["HTML"],
      thumb: "../assets/thumb/atlasfit.png",
      live: "https://aisurohito.github.io/ecommerce-para-exposicao/",
      repo: "#",
      status: "Demonstração"
    },
  ]
};
