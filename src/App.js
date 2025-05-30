import React, { useState, useEffect } from 'react'
import Home from './page/Home';
import About from './page/About';
import Product from './page/Product';
import Return from './page/Return';
import Privacy from './page/Privacy';
import Contact from './page/Contact';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Shield, Leaf, Brain, Hand } from 'lucide-react';
import Navbar from './components/Navbar';
import MinimalNavbar from './components/MinimalNavbar';
import Footer from './components/Footer';
import review from './assets/review.jpg';
import review1 from './assets/review1.jpg';
import about from './assets/about.jpg';
import Checkout from './page/Checkout';
import TermsAndConditions from './page/Terms';
import CancelPolicy from './page/Cancel';
import ShippingPolicy from './page/Shipping';
import callLogo from './assets/call.png';
import Checkout_two from './page/Checkout_two';
import { FaPhoneAlt, } from 'react-icons/fa';
import Checkout_test1 from './page/Checkout_test1';
import Checkout_test2 from './page/Checkout_test2';
import whatsappLogo from './assets/whats.png';
import Blog from './page/Blog';
import BlogDetail from './page/BlogDetail';
import blog1 from './assets/blogs/one.jpg'
import blog2 from './assets/blogs/two.jpg'
import blog3 from './assets/blogs/three.jpg'
import Landing from './page/Landing';
import ThankYou from './page/ThankYou';
import { LanguageProvider } from './contexts/LanguageContext';
import Agent from './page/Agent';

// Language options
const languages = [
  { code: 'en', name: 'English' },
  // { code: 'ar', name: 'العربية' },
];

// Translations object (you'll need to add complete translations)
const translations = {
  en: {
    nav: {
      home: 'Home',
      homelink: '/',
      aboutUs: 'About Us',
      aboutUslink: '/about',
      product: 'Product',
      productlink: '/product',
      returnPolicy: 'Return Policy',
      returnPolicylink: '/return',
      Checkout: 'Checkout',
      Checkoutlink: '/checkouts',
      cancellink: '/cancel',
      cancel: 'Cancellation Policy',
      shipping: 'Shipping Policy',
      shippinglink: '/shipping',
      contactUs: 'Contact Us',
      contactUslink: '/contact',
      terms: "Terms & Conditions",
      natural: "100% Natural",
      lastone: "© 2024. All Rights Reserved By Dr.Joints",
      terms: "Terms & Conditions",
      termslink: '/terms',
      blog: 'Blog',
      bloglink: '/blog',
    },
    hero: {
      title: 'Best Pain Relief Oil For Muscles',
      description: 'Natural pain relief solution for your daily needs'
    },
    about: {
      title: 'About Us',
      content1: `Our Mission..., is to provide natural, effective solutions for those struggling with
          joint pain, helping you regain flexibility and comfort. We offer premium Ayurvedic
          oils, formulated using traditional herbs and ingredients, to help alleviate joint
          discomfort and promote recovery. These oils not only relieve pain but also work to
          strengthen your joints, muscles, and bones, ensuring long-term health benefits.`,
      content2: `At Dr. Joints, we believe in the power of nature and holistic wellness. Our commitment to quality
          and authenticity ensures that each product is crafted to deliver lasting relief, allowing you to
          embrace life with ease and confidence.`,
      question1: `Why Choose Our Muscle Pain Relief Oil?`,
      question2: "Natural Ingredients:",
      answer1: `Our oil is crafted with the finest Ayurvedic herbs known for their anti-inflammatory and pain-relieving properties, providing a natural and safe solution.`,
      question3: "Quick Absorption:",
      answer2: `The lightweight formula ensures rapid absorption, allowing the active ingredients to reach deep into the muscle tissues for faster relief.`,
      question4: "Suitable for All Ages:",
      answer3: ` Whether you're an athlete recovering from a strenuous workout or someone dealing with age-related muscle pain, our oil is the perfect solution for people of all ages.`,

    },
    product: {
      title: 'Our Product',
      subtitle: 'Best Pain Relief Oil For Muscles',
      content1: `Joint pain can be your worst nightmare or an joint pain relief ayurvedic oil unwanted guest during chilly
          winters, cold monsoons or old age.Joints – the connecting tissues between our bones – are an
          extremely important part of the human body.`,
      content2: `The health of your joints can determine the level of flexibility and ease with which your body performs
          everyday tasks. Imagine not being able to do mundane tasks that we take for granted – standing up,
          sitting down, walking, picking up weight, bending, etc.`,
      content3: `While regular exercise, a balanced diet, and a healthy lifestyle can prevent joint pains to a certain
          extent, sometimes there is no way to circumvent it. At times like these, you need a reliable remedy that
          can not only help deal with the discomfort that comes with joint disorders but also aid the recovery
          process and strengthen your joints, muscles, and bones.`
    },
    faq: {
      title: "FAQ's",
      faqData: [
        {
          question: "What is DR.Joints Pain Relief Oil for Muscle Pain?",
          answer: "DR.Joints Pain Relief Oil is an Ayurvedic oil designed to relieve muscle pain, stiffness, and inflammation. It is formulated with a blend of natural herbs and ingredients that work to alleviate discomfort and promote muscle recovery."
        },
        {
          question: "How does the oil work?",
          answer: "The oil penetrates deep into the muscle tissues, providing quick relief by reducing inflammation, improving blood circulation, and soothing muscle tension. Its natural ingredients help relieve pain and prevent future soreness by strengthening the muscles over time."
        },
        {
          question: "Is the oil made from natural ingredients?",
          answer: "Yes, DR.Joints Pain Relief Oil is made using 100% natural and Ayurvedic ingredients. We use herbs known for their anti-inflammatory, pain-relieving, and muscle-nourishing properties, ensuring a safe and effective product."
        },
        {
          question: "How should I use the oil?",
          answer: "Apply a small amount of oil to the affected area and gently massage it in circular motions until the oil is absorbed. For best results, use the oil 2-3 times a day, or as directed. Consistent use helps promote long-term relief."
        },
        {
          question: "Can the oil be used for joint pain as well?",
          answer: "Yes, our pain relief oil is versatile and can be used for both muscle and joint pain. It is effective in reducing inflammation and discomfort in areas such as knees, shoulders, elbows, and other joints."
        },
        {
          question: "Is it safe to use daily?",
          answer: "Absolutely! The oil is made from safe, natural ingredients and is suitable for daily use. Regular application can help maintain muscle and joint flexibility, reduce stiffness, and prevent pain."
        },
        {
          question: "Who can use this oil?",
          answer: "Our pain relief oil is suitable for all age groups. Whether you are an athlete, an individual recovering from muscle strain, or someone experiencing age-related muscle and joint pain, the oil can help relieve discomfort effectively."
        },
        {
          question: "How long will it take to feel relief?",
          answer: "Many users feel relief shortly after application, as the oil is quickly absorbed into the skin. However, the duration may vary depending on the severity of the pain. For chronic pain, regular use over time will yield the best results."
        }
      ]
    },
    testimonials: {
      title: 'Testimonials',
      testimonial: [
        {
          image: review,
          text: "I recommend Dr. Joints to all my clients who have joint issues. It's effective, natural, and has helped many of them stay active and pain-free. Personally, I've experienced a noticeable improvement in joint mobility and recovery times. It's a fantastic product!",
          name: 'Sanjay Sharma',
          role: 'Business Owner',
        },
        {
          image: review1,
          text: "I had been suffering from knee pain for the last 2 years. My friend suggested a joint pain relief oil. I have now started using this oil and have experienced a lot of relief from my knee pain. It's a good product.",
          name: 'Ahmed Shaikh',
          role: 'Teacher',
        },
        {
          image: null,
          text: "It is a very nice product. I have been using it for the last 4 months, and all my joint pains are gone. It is a much-needed product for senior citizens like me. I have already recommended it to all my friends.",
          name: 'Srinivas Reddy',
          role: 'Real eState Age',
        },
      ]
    },
    contact: {
      title: 'Contact Us',
      address: 'Begumpet, Hyderabad, Telangana 500016',
      phone: '+91 9908 016 333',
      email: 'israelitesshopping171@gmail.com',
      info: "information",
      det: "Details",
      pagetitle: 'Need your help?',
      pagesectitle: 'You can contact us today ',
      pageinname: "Your Name",
      pageinemail: "Your Email",
      pageinphone: "Your Phone",
      pageinsubject: "Subject",
      pageinmessage: "Write you present condition...",
      pagesubbutton: "Send Message",
    },
    aboutpage: {
      title: "About Us",
      img: about,
    },
    productpage: {
      title: "Best Pain Relief Oil For Muscles",
      secondtitle: 'Qty',
      content: `DR. Joints is an effective solution for relieving joint pain and discomfort.
                            Formulated with a blend of natural ingredients, it targets inflammation and
                            promotes better mobility, allowing you to enjoy your daily activities without
                            restriction. Whether you're facing age-related joint issues or pain from physical
                            exertion, DR. Joints provides fast-acting relief, helping to strengthen your joints
                            and improve overall flexibility. Ideal for everyday use, it supports a healthier,
                            more active lifestyle.`,
      buy: 'Buy Now',

    },
    returnpage: {
      title: 'Return Policy',
      sectitle: 'Return Policy',
      content1: `Dr.Joints is committed to helping millions of people become fitter, healthier, and happier; we stand behind the quality of our products with a 15-day return policy. If you don't believe our products are improving the quality of your life, we offer a refund within 15 days of receipt of your order, less the shipping cost. Any remaining product and original packaging must be returned to Dr.Joints for a refund.`,
      content2: `Eligibility – Your purchase is eligible for a return if it meets the criteria below:`,
      content3: `Refunds require returning used or unused products packaging of Dr.Joints Products.`,
      content4: `Return Process has to be done by the customer only.`,
      content5: `The product has to reach the specified address on the website`,
      content6: `The product has to arrive within 15 days of the Date of purchasing the product`,
      content7: `We will not accept damaged products.`,
      content8: `Amount will be added to the actual source of payment done by the customer within 10 working days`,
    },
    sections: [
      {
        title: "Information We Collect",
        content: [
          {
            text: "This Privacy Policy describes how Dr.Joints Fat and Weight Loss Oil collects, uses, and discloses your information when you use our website https://drjoints.in"
          },
          {
            subtitle: "Personal Information",
            text: "This includes information that can be used to identify you, such as your name, billing address, shipping address, email address, and phone number. You only provide this information when you contact us through a form on the Site."
          },
          {
            subtitle: "Non-Personal Information",
            text: "This includes information that cannot be used to identify you, such as your browser type, operating system, IP address, browsing activity on the Site, and demographic information (e.g., age, gender). This information is collected automatically when you visit the Site."
          }
        ]
      },
      {
        title: "How We Use Your Information",
        content: [
          {
            subtitle: "Personal Information",
            text: "We will only use your personal information to respond to inquiries and requests. We will not share your personal information with any third parties without your consent, except as required by law."
          },
          {
            subtitle: "Non-Personal Information",
            text: "We use non-personal information to improve the Site and understand how users interact. We may also use non-personal information for internal marketing and promotional purposes."
          }
        ]
      },
      {
        title: "Cookies and Tracking Technologies",
        content: [
          {
            text: "We may use cookies and other tracking technologies to collect non-personal information about your use of the Site. Cookies are small data files that are stored on your device when you visit a website. They allow the website to remember your actions and preferences over time."
          },
          {
            text: "If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser."
          },
          {
            text: "When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select \u201cRemember Me\u201d, your login will persist for two weeks. If you log out of your account, the login cookies will be removed."
          },
          {
            text: "If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day."
          }
        ]
      },
      {
        title: "Third-Party Service Providers",
        content: [
          {
            text: "We may use third-party service providers to help us operate the Site and deliver our services. These service providers may have access to your non-personal information. We will not share your personal information with any third-party service providers for their marketing purposes without your consent."
          }
        ]
      },
      {
        title: "Security",
        content: [
          {
            text: "We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure."
          }
        ]
      },
      {
        title: "Children’s Privacy",
        content: [
          {
            text: "The Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us. We will take steps to remove the information from our records."
          }
        ]
      },
      {
        title: "Changes to this Privacy Policy",
        content: [
          {
            text: "We may update this Privacy Policy from time to time. We will post any changes on the Site. We encourage you to review this Privacy Policy periodically for the latest information on our privacy practices."
          }
        ]
      },
      {
        title: "Contact Us",
        content: [
          {
            text: "If you have any questions about this Privacy Policy, please get in touch with us at hello@drjoints.in"
          }
        ]
      }
    ],
    privacy: {
      title: "Privacy Policy"
    },
    checkout: {
      title: "Checkout",
      sectitle: "Billing Details",
      firstname: 'First Name ',
      lastname: 'Last Name ',
      country: 'Country/ Region ',
      address: 'Street Address ',
      city: 'Town/ City ',
      countrytitle: "Country ",
      phone: "Phone ",
      email: "Email Address ",
      order: "Your Order",
      clientaddress: "Apartment/Suite",
      mode: "Payment Mode",
      total: "Total",
      shipping: "Shipping",
      subtotal: "Subtotal",
      product: "Product",
      order: "Place Order",
      processing: "Processing...",
      successfully: "Order Placed Successfully!",
      thank: "Thank you for your purchase. You will receive a confirmation email shortly.",
      continue: "Continue Shopping"
    },
    features: [
      {
        icon: Brain,
        title: "Effective Pain Relief",
        color: "text-blue-500"
      },
      {
        icon: Leaf,
        title: "Natural Ingredients",
        color: "text-green-500"
      },
      {
        icon: Hand,
        title: "Promotes Recovery",
        color: "text-orange-500"
      },
      {
        icon: Shield,
        title: "Convenient And Easy To Use",
        color: "text-purple-500"
      }
    ],
    termsData: {
      title: "Terms & Conditions",
      sections: [
        {
          title: "Welcome to Dr.Joints!",
          content: "These terms and conditions outline the rules and regulations for the use of Dr.Joints Website, located at https://drjoints.in, A product of Pain Relief Oil. By accessing this website we assume you accept these terms and conditions. Do not continue to use Dr.Joints if you do not agree to take all of the terms and conditions stated on this page."
        },
        {
          title: "Terminology",
          content: "The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice, and all Agreements: \u201cClient\u201d, \u201cYou\u201d and \u201cYou\u2019re\u201d refers to you, the person who logs on to this website and is compliant with the Company\u2019s terms and conditions. \u201cThe Company\u201d, \u201cOurselves\u201d, \u201cWe\u201d, \u201cOur\u201d and \u201cUs\u201d, refers to our Company. \u201cParty\u201d, \u201cParties\u201d, or \u201cUs\u201d, refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client most appropriately for the express purpose of meeting the Client\u2019s needs in respect of the provision of the Company\u2019s stated services, by and subject to, prevailing law. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to the same."
        },
        {
          title: "Cookies",
          content: "We employ the use of cookies. By accessing Dr.Joints, you agree to use cookies in agreement with Dr.Joints\u2019s Privacy Policy. Most interactive websites use cookies to let us retrieve the user\u2019s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies."
        },
        {
          title: "Intellectual Property Rights",
          content: "Unless otherwise stated, Dr.Joints and/or its licensors own the intellectual property rights for all material on Dr.Joints. All intellectual property rights are reserved. You may access this from Dr.Joints for your personal use subject to restrictions set in these terms and conditions."
        },
        {
          title: "Restrictions",
          content: [
            "Republish material from Dr.Joints",
            "Sell, rent, or sub-license material from Dr.Joints",
            "Reproduce, duplicate, or copy material from Dr.Joints",
            "Redistribute content from Dr.Joints"
          ]
        },
        {
          title: "User Comments",
          content: "Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Dr.Joints does not filter, edit, publish, or review Comments before their presence on the website. Comments do not reflect the views and opinions of Dr.Joints, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Dr.Joints shall not be liable for the Comments or any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website."
        },
        {
          title: "Liability for Links",
          content: "We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that arise on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights."
        }
      ]
    },
    blog: {
      title: 'Latest Articles',
      subtitle: 'Discover insights about joint health and natural remedies',
      newsletter: {
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter for the latest articles and health tips',
        placeholder: 'Enter your email',
        button: 'Subscribe'
      }
    },
    blogPosts: [
       {
          id: 1,
          title: "Natural Remedies for Chronic Joint Pain",
          date: "March 15, 2024",
          excerpt: "Discover effective natural remedies and lifestyle changes that can help manage chronic joint pain without relying solely on medication.",
          content: `Joint pain affects millions of people worldwide, impacting daily activities and quality of life. While conventional treatments are available, many people are turning to natural remedies for relief. This article explores various natural approaches to managing joint pain, including:

          1. Anti-inflammatory foods
          2. Gentle exercise routines
          3. Herbal supplements
          4. Ayurvedic treatments
          
          Our comprehensive guide will help you understand how these natural remedies work and how to incorporate them into your daily routine.`,
          readTime: "5 min read",
          image: blog1
        },
        {
        id: 2,
        title: "Say Goodbye to Joint Pain with Ayurvedic Oil",
        date: "April 8, 2025",
        excerpt: "Learn how Ayurvedic solutions like DR. Joints Pain Relief Oil can help you naturally combat joint and muscle pain, especially during colder seasons or aging.",
        content: `Joint pain can be a major obstacle in everyday life, making simple tasks like walking, sitting, or bending difficult. While regular exercise and a balanced diet can help, sometimes pain is inevitable due to weather changes or aging.

      At times like these, turning to natural remedies can make all the difference. DR. Joints Pain Relief Oil is an Ayurvedic solution designed to relieve joint and muscle pain safely and effectively.

      How does it work?
      The oil penetrates deep into the tissues, reducing inflammation, improving blood circulation, and soothing muscle tension. Its powerful herbal formula not only relieves pain quickly but also strengthens muscles and joints over time.

      Made from 100% natural ingredients, this oil harnesses the anti-inflammatory and muscle-nourishing properties of Ayurvedic herbs. It's safe for daily use and suitable for all age groups, from athletes to seniors.

      How to use it?
      Simply apply a small amount of oil to the affected area and massage gently in circular motions until fully absorbed. For best results, use 2-3 times a day consistently.

      Why choose DR. Joints Pain Relief Oil?
      - Fast relief from muscle and joint pain
      - Reduces stiffness and improves flexibility
      - Safe for daily use
      - Suitable for all ages

      Whether you're dealing with old injuries, age-related discomfort, or winter-related stiffness, DR. Joints Pain Relief Oil is your natural companion for lasting relief.`,
        readTime: "4 min read",
        image: blog2
      },
      {
        id: 3,
        title: "Experience Natural Relief: Benefits of Ayurvedic Pain Relief Oils",
        date: "April 8, 2025",
        excerpt: "Explore how Ayurvedic oils like DR. Joints Pain Relief Oil can naturally ease joint and muscle pain, strengthen your body, and improve flexibility.",
        content: `Joint pain can turn daily routines into major challenges, especially during cold weather or as we age. Our joints are essential for movement, and keeping them healthy is key to maintaining an active lifestyle.

      While prevention through exercise and diet is important, when pain strikes, you need a remedy that's safe, effective, and natural. DR. Joints Pain Relief Oil offers a trusted Ayurvedic solution.

      What makes it special?
      Formulated with 100% natural herbs, the oil targets the root cause of pain by penetrating deep into the muscle tissues. It helps reduce inflammation, improves blood circulation, and eases muscle stiffness, providing quick and lasting relief.

      How to use:
      Massage a small amount of oil onto the painful area in gentle, circular motions until absorbed. Apply 2-3 times daily for best results.

      Key Benefits:
      - Quick pain relief
      - Strengthens joints, muscles, and bones
      - Enhances flexibility
      - Reduces stiffness
      - Safe for everyday use

      Suitable for athletes, elders, and anyone experiencing muscle or joint discomfort, DR. Joints Pain Relief Oil is your natural ally for a pain-free, active life.

      Start your journey towards better joint health today with the power of Ayurveda.`,
        readTime: "4 min read",
        image: blog3
      }
            // ...other blog posts...
          ]
        }
};

const blogPosts = [
        {
          id: 1,
          title: "Natural Remedies for Chronic Joint Pain",
          date: "March 15, 2024",
          excerpt: "Discover effective natural remedies and lifestyle changes that can help manage chronic joint pain without relying solely on medication.",
          content: `Joint pain affects millions of people worldwide, impacting daily activities and quality of life. While conventional treatments are available, many people are turning to natural remedies for relief. This article explores various natural approaches to managing joint pain, including:

          1. Anti-inflammatory foods
          2. Gentle exercise routines
          3. Herbal supplements
          4. Ayurvedic treatments
          
          Our comprehensive guide will help you understand how these natural remedies work and how to incorporate them into your daily routine.`,
          readTime: "5 min read",
          image: blog1
        },
        {
        id: 2,
        title: "Say Goodbye to Joint Pain with Ayurvedic Oil",
        date: "April 8, 2025",
        excerpt: "Learn how Ayurvedic solutions like DR. Joints Pain Relief Oil can help you naturally combat joint and muscle pain, especially during colder seasons or aging.",
        content: `Joint pain can be a major obstacle in everyday life, making simple tasks like walking, sitting, or bending difficult. While regular exercise and a balanced diet can help, sometimes pain is inevitable due to weather changes or aging.

      At times like these, turning to natural remedies can make all the difference. DR. Joints Pain Relief Oil is an Ayurvedic solution designed to relieve joint and muscle pain safely and effectively.

      How does it work?
      The oil penetrates deep into the tissues, reducing inflammation, improving blood circulation, and soothing muscle tension. Its powerful herbal formula not only relieves pain quickly but also strengthens muscles and joints over time.

      Made from 100% natural ingredients, this oil harnesses the anti-inflammatory and muscle-nourishing properties of Ayurvedic herbs. It's safe for daily use and suitable for all age groups, from athletes to seniors.

      How to use it?
      Simply apply a small amount of oil to the affected area and massage gently in circular motions until fully absorbed. For best results, use 2-3 times a day consistently.

      Why choose DR. Joints Pain Relief Oil?
      - Fast relief from muscle and joint pain
      - Reduces stiffness and improves flexibility
      - Safe for daily use
      - Suitable for all ages

      Whether you're dealing with old injuries, age-related discomfort, or winter-related stiffness, DR. Joints Pain Relief Oil is your natural companion for lasting relief.`,
        readTime: "4 min read",
        image: blog2
      },
      {
        id: 3,
        title: "Experience Natural Relief: Benefits of Ayurvedic Pain Relief Oils",
        date: "April 8, 2025",
        excerpt: "Explore how Ayurvedic oils like DR. Joints Pain Relief Oil can naturally ease joint and muscle pain, strengthen your body, and improve flexibility.",
        content: `Joint pain can turn daily routines into major challenges, especially during cold weather or as we age. Our joints are essential for movement, and keeping them healthy is key to maintaining an active lifestyle.

      While prevention through exercise and diet is important, when pain strikes, you need a remedy that's safe, effective, and natural. DR. Joints Pain Relief Oil offers a trusted Ayurvedic solution.

      What makes it special?
      Formulated with 100% natural herbs, the oil targets the root cause of pain by penetrating deep into the muscle tissues. It helps reduce inflammation, improves blood circulation, and eases muscle stiffness, providing quick and lasting relief.

      How to use:
      Massage a small amount of oil onto the painful area in gentle, circular motions until absorbed. Apply 2-3 times daily for best results.

      Key Benefits:
      - Quick pain relief
      - Strengthens joints, muscles, and bones
      - Enhances flexibility
      - Reduces stiffness
      - Safe for everyday use

      Suitable for athletes, elders, and anyone experiencing muscle or joint discomfort, DR. Joints Pain Relief Oil is your natural ally for a pain-free, active life.

      Start your journey towards better joint health today with the power of Ayurveda.`,
        readTime: "4 min read",
        image: blog3
      }


  // ... other blog posts ...
];
const AuthorizedAgent = () => {
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIP = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/check-ip', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await res.json();
        
        if (res.status === 200 && data.allowed === true) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          // Redirect to home page after 3 seconds
          setTimeout(() => {
            window.location.href = "/";
          }, 10000);
        }
      } catch (err) {
        console.error('IP check failed:', err);
        setAuthorized(false);
        // Redirect to home page after 10 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 10000);
      } finally {
        setLoading(false);
      }
    };

    checkIP();
    
    // Check IP every 30 seconds to ensure continued authorization
    const interval = setInterval(checkIP, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading || authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Verifying access permissions...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You are not authorized to access this page.</p>
          <p className="text-sm text-gray-500 mb-4">Redirecting to home page...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return <Agent />;
};

const App = () => {
  // Initialize language from localStorage or default to 'en'
  const [currentLang, setCurrentLang] = useState('en');

  // Custom language setter that also updates localStorage
  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  // Effect to ensure language persists on page reload
  useEffect(() => {
    // Update localStorage whenever language changes
    localStorage.setItem('preferredLanguage', currentLang);

    // Optional: Set lang attribute on html element
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleCall = () => {
    window.location.href = 'tel:+919908016333';
  };

  // Component to conditionally render Navbar
  const ConditionalNavbar = () => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/Drjoints';
    const isAgentPage = location.pathname === '/agent';
    
    if (isLandingPage || isAgentPage) {
      return isLandingPage ? <MinimalNavbar /> : null;
    } else {
      return <Navbar currentLang={currentLang} setCurrentLang={handleLanguageChange} translations={translations} languages={languages} />;
    }
  };

  // Component to conditionally render Footer
  const ConditionalFooter = () => {
    const location = useLocation();
    const shouldShowFooter = location.pathname !== '/Drjoints' && location.pathname !== '/agent';
    
    return shouldShowFooter ? (
      <Footer currentLang={currentLang} translations={translations} />
    ) : null;
  };

  return (
    <div>
      <div className="fixed bottom-10 z-50 right-10 animate-bounce-slow">
        <a href="https://wa.me/9908016333" target="_blank" rel="noopener noreferrer">
          <img src={whatsappLogo} alt="WhatsApp" className="w-16 hover:scale-110 transition-transform duration-300"/>
        </a>
      </div>
      {/* Mobile version call option */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 
                        flex justify-around items-center py-3 px-4 space-x-4">
        <button
          onClick={handleCall}
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-full 
                       flex items-center justify-center space-x-2 shadow-md
                       active:scale-95 transition-transform"
        >
          <FaPhoneAlt className="text-lg" />
          <span className="text-sm font-medium">Call Now</span>
        </button>
      </div>

      <BrowserRouter>
        <ConditionalNavbar />
        <Routes>
          <Route path='/' element={<Home currentLang={currentLang} translations={translations} />} />
          <Route path='/about' element={<About currentLang={currentLang} translations={translations} />} />
          <Route path='/product' element={<Product currentLang={currentLang} translations={translations} />} />
          <Route path='/return' element={<Return currentLang={currentLang} translations={translations} />} />
          <Route path='/privacy' element={<Privacy currentLang={currentLang} translations={translations} />} />
          <Route path='/contact' element={<Contact currentLang={currentLang} translations={translations} />} />
          <Route path='/checkout' element={<Checkout currentLang={currentLang} translations={translations} />} />
          <Route path='/checkouts' element={<Checkout_two currentLang={currentLang} translations={translations} />} />
          <Route path='/terms' element={<TermsAndConditions currentLang={currentLang} translations={translations} />} />
          <Route path='/cancel' element={<CancelPolicy currentLang={currentLang} translations={translations} />} />
          <Route path='/shipping' element={<ShippingPolicy currentLang={currentLang} translations={translations} />} />
          <Route path='/checkout_test_two' element={<Checkout_test1 currentLang={currentLang} translations={translations} />} />
          <Route path='/checkout_test_three' element={<Checkout_test2 currentLang={currentLang} translations={translations} />} />
          <Route path='/blog' element={<Blog currentLang={currentLang} translations={translations} blogPosts={blogPosts} />} />
          <Route path='/blog/:id' element={<BlogDetail currentLang={currentLang} translations={translations} blogPosts={blogPosts} />} />
          <Route path='/Drjoints' element={<Landing currentLang={currentLang} translations={translations} />} />
          <Route path='/thank-you' element={<ThankYou />} />
          {/* <Route path='/agent' element={<Agent />} /> */}
          <Route path='/agent' element={<AuthorizedAgent />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
        <ConditionalFooter />
      </BrowserRouter>
    </div>
  )
}

export default App




