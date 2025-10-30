import React, { useState, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import html2canvas from "html2canvas";

const SoilReport = () => {
  const chartRef = useRef(null);
  const [language, setLanguage] = useState("english");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Translations
  const translations = {
    english: {
      title: "Soil Analysis Report",
      farmerInfo: "Farmer Information",
      submit: "Submit Data",
      soilData: "Soil Nutrient Data",
      generateReport: "Generate Analysis",
      graphTitle: "Nutrient Levels Visualization",
      recommendations: "Fertilizer Recommendations",
      print: "Export Report",
      healthySoil: "Healthy Soil, Healthy Future",
      language: "Language",
      formLabels: {
        FarmerName: "Farmer Name",
        Aadhaar: "Aadhaar Number",
        MobileNo: "Mobile Number",
        Village: "Village",
        District: "District",
        Taluka: "Taluka",
        SoilType: "Soil Type",
        SoilSample: "Sample Number",
        SampleDate: "Sample Date",
        ReportDate: "Report Date",
        TotalArea: "Total Area (acres)",
        SurveyNumber: "Survey Number",
        Pincode: "Pincode"
      },
      errors: {
        required: "is required",
        aadhaar: "Aadhaar must be 12 digits",
        mobile: "Mobile Number must be 10 digits",
        pincode: "Pincode must be 6 digits",
        number: "must be a number"
      },
      soilTable: {
        nutrient: "Nutrient",
        unit: "Unit",
        min: "Min",
        max: "Max",
        value: "Value",
        status: "Status",
        recommendation: "Recommendation"
      },
      status: {
        notEntered: "Not Entered",
        low: "Low",
        high: "High",
        optimal: "Optimal"
      },
      printLabels: {
        page1Title: "Soil Analysis Report",
        farmerInfo: "Farmer Information",
        soilResults: "Soil Test Results",
        page1Footer: "Page 1 of 2",
        page2Title: "Soil Analysis & Recommendations",
        nutrientVisualization: "Nutrient Levels Visualization",
        lowDeficient: "Low (Deficient)",
        optimal: "Optimal",
        highExcess: "High (Excess)",
        fertilizerRecommendations: "Fertilizer Recommendations",
        organicFertilizer: "Organic Fertilizer:",
        bioFertilizer: "Bio-Fertilizer:",
        limeGypsum: "Lime/Gypsum:",
        micronutrients: "Micronutrients:",
        additionalNotes: "Additional Notes",
        generatedOn: "Generated on:",
        page2Footer: "Page 2 of 2",
        analystLabInCharge: "Soil Analyst",
        note: "Note:",
        authorisedBy: "Authorised by",
        managingDirector: "Managing Director",
        officeAddress: "Office Address",
        labAddress: "Lab Address",
        contactEmail: "Contact Details",
        website: "Website"
      }
    },
    marathi: {
      title: "माती विश्लेषण अहवाल",
      farmerInfo: "शेतकऱ्याची माहिती",
      submit: "डेटा सबमिट करा",
      soilData: "माती पोषक तत्व डेटा",
      generateReport: "विश्लेषण तयार करा",
      graphTitle: "पोषक तत्व स्तर दृश्य",
      recommendations: "खत शिफारस",
      print: "अहवाल निर्यात करा",
      healthySoil: "निरोगी माती, निरोगी भविष्य",
      language: "भाषा",
      formLabels: {
        FarmerName: "शेतकऱ्याचे नाव",
        Aadhaar: "आधार क्रमांक",
        MobileNo: "मोबाईल क्रमांक",
        Village: "गाव",
        District: "जिल्हा",
        Taluka: "तालुका",
        SoilType: "मातीचा प्रकार",
        SoilSample: "नमुना क्रमांक",
        SampleDate: "नमुन्याची तारीख",
        ReportDate: "अहवालाची तारीख",
        TotalArea: "एकूण क्षेत्र (एकर)",
        SurveyNumber: "सर्वेक्षण क्रमांक",
        Pincode: "पिनकोड"
      },
      errors: {
        required: "आवश्यक आहे",
        aadhaar: "आधार क्रमांक १२ अंकी असावा",
        mobile: "मोबाईल क्रमांक १० अंकी असावा",
        pincode: "पिनकोड ६ अंकी असावा",
        number: "संख्या असावी"
      },
      soilTable: {
        nutrient: "पोषक तत्व",
        unit: "एकक",
        min: "किमान",
        max: "कमाल",
        value: "मूल्य",
        status: "स्थिती",
        recommendation: "शिफारस"
      },
      status: {
        notEntered: "प्रविष्ट केले नाही",
        low: "कमी",
        high: "जास्त",
        optimal: "इष्टतम"
      },
      printLabels: {
        page1Title: "माती विश्लेषण अहवाल",
        farmerInfo: "शेतकऱ्याची माहिती",
        soilResults: "माती चाचणी निकाल",
        page1Footer: "पृष्ठ १ पैकी २",
        page2Title: "माती विश्लेषण आणि शिफारस",
        nutrientVisualization: "पोषक तत्व स्तर दृश्य",
        lowDeficient: "कमी (उणीव)",
        optimal: "इष्टतम",
        highExcess: "जास्त (अतिरिक्त)",
        fertilizerRecommendations: "खत शिफारस",
        organicFertilizer: "सेंद्रिय खत:",
        bioFertilizer: "जैविक खत:",
        limeGypsum: "चुना/जिप्सम:",
        micronutrients: "सूक्ष्म पोषक तत्व:",
        additionalNotes: "अतिरिक्त टिपा",
        generatedOn: "तयार केले:",
        page2Footer: "पृष्ठ २ पैकी २",
        analystLabInCharge: "माती विश्लेषक",
        note: "टीप:",
        authorisedBy: "प्राधिकृत",
        managingDirector: "व्यवस्थापकीय संचालक",
        officeAddress: "कार्यालयाचा पत्ता",
        labAddress: "प्रयोगशाळेचा पत्ता",
        contactEmail: "संपर्क तपशील",
        website: "वेबसाइट",
        SoilAnlysisSystem: "माती विश्लेषण प्रणाली"
      }
    }
  };

  const t = translations[language];

  const [reportData, setReportData] = useState({
    FarmerName: "",
    Aadhaar: "",
    MobileNo: "",
    Village: "",
    District: "",
    Taluka: "",
    SoilType: "",
    SoilSample: "",
    SampleDate: "",
    ReportDate: "",
    TotalArea: "",
    SurveyNumber: "",
    Pincode: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [soilData, setSoilData] = useState([
    { name: "pH", unit: "", value: "", min: 6.5, max: 7.5 },
    { name: "EC", unit: "ds/m", value: "", min: 0, max: 1 },
    { name: "Organic Carbon", unit: "%", value: "", min: 0.51, max: 0.75 },
    { name: "Nitrogen", unit: "Kg/ha", value: "", min: 280, max: 560 },
    { name: "Phosphorus", unit: "Kg/ha", value: "", min: 10, max: 25 },
    { name: "Potassium", unit: "Kg/ha", value: "", min: 145, max: 337 },
    { name: "Calcium", unit: "meq", value: "", min: 65, max: 80 },
    { name: "Magnesium", unit: "meq", value: "", min: 10, max: 15 },
    { name: "Sulfur", unit: "ppm", value: "", min: 10, max: 20 },
    { name: "Sodium", unit: "ppm", value: "", min: 5, max: 15 },
    { name: "Iron", unit: "ppm", value: "", min: 2.0, max: 5.0 },
    { name: "Zinc", unit: "ppm", value: "", min: 1.0, max: 5.0 },
    { name: "Manganese", unit: "ppm", value: "", min: 2.0, max: 5.0 },
    { name: "Copper", unit: "ppm", value: "", min: 0.2, max: 5.0 },
    { name: "Boron", unit: "ppm", value: "", min: 0.5, max: 1.0 },
    { name: "Calcium Carbonate", unit: "%", value: "", min: 1.0, max: 15.00 },
    { name: "WHC", unit: "%", value: "", min: 0, max: 100 },
  ]);

  const [showGraph, setShowGraph] = useState(false);
  const [error, setError] = useState("");
  const [isFarmerDataSubmitted, setIsFarmerDataSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    const { FarmerName, Aadhaar, MobileNo, Village, District, Taluka, SoilType, SoilSample, SampleDate, ReportDate, TotalArea, SurveyNumber, Pincode } = reportData;

    if (!FarmerName.trim()) errors.FarmerName = `${t.formLabels.FarmerName} ${t.errors.required}`;
    if (!Aadhaar.trim() || Aadhaar.length !== 12 || !/^\d+$/.test(Aadhaar)) errors.Aadhaar = t.errors.aadhaar;
    if (!MobileNo.trim() || MobileNo.length !== 10 || !/^\d+$/.test(MobileNo)) errors.MobileNo = t.errors.mobile;
    if (!Village.trim()) errors.Village = `${t.formLabels.Village} ${t.errors.required}`;
    if (!District.trim()) errors.District = `${t.formLabels.District} ${t.errors.required}`;
    if (!Taluka.trim()) errors.Taluka = `${t.formLabels.Taluka} ${t.errors.required}`;
    if (!SoilType.trim()) errors.SoilType = `${t.formLabels.SoilType} ${t.errors.required}`;
    if (!SoilSample.trim()) errors.SoilSample = `${t.formLabels.SoilSample} ${t.errors.required}`;
    if (!TotalArea.trim() || isNaN(TotalArea)) errors.TotalArea = `${t.formLabels.TotalArea} ${t.errors.number}`;
    if (!SurveyNumber.trim()) errors.SurveyNumber = `${t.formLabels.SurveyNumber} ${t.errors.required}`;
    if (!Pincode.trim() || Pincode.length !== 6 || !/^\d+$/.test(Pincode)) errors.Pincode = t.errors.pincode;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log("Submitted Data:", reportData);
      alert(language === "english" ? "✅ Data Submitted Successfully!" : "✅ माहिती यशस्वीरित्या सबमिट केली!");
      setIsFarmerDataSubmitted(true);
    } else {
      alert(language === "english" ? "⚠ Please correct the errors before submitting." : "⚠ सबमिट करण्यापूर्वी त्रुटी दुरुस्त करा");
    }
  };

  const handleSoilChange = (index, newValue) => {
    const updatedData = [...soilData];
    updatedData[index].value = newValue === "" ? "" : parseFloat(newValue);
    setSoilData(updatedData);
  };

  const generateReport = () => {
    const isDataFilled = soilData.every((item) => item.value !== "");
    if (isDataFilled) {
      setShowGraph(true);
      setError("");
    } else {
      setError(language === "english"
        ? "⚠ Please fill in all soil test values before generating the report."
        : "⚠ कृपया अहवाल तयार करण्यापूर्वी सर्व माती चाचणी मूल्ये भरा.");
      setShowGraph(false);
    }
  };

  const getBarColor = (value, min, max) => {
    if (value === "") return "#CBD5E0";
    if (value < min) return "#48BB78";
    if (value > max) return "#F56565";
    return "#ECC94B";
  };

  const getRecommendation = (name, value, min, max) => {
    if (value === "") return language === "english" ? "Data not available" : "माहिती उपलब्ध नाही";
    if (value < min) return language === "english" ? `Increase ${name} levels` : `${name} पातळी वाढवा`;
    if (value > max) return language === "english" ? `Reduce ${name} levels` : `${name} पातळी कमी करा`;
    return language === "english" ? "Optimal level" : "इष्टतम पातळी";
  };

  const getPrintLabel = (key) => {
    return t.printLabels[key] || key;
  };

  const handlePrint = async () => {
    try {
      const chartElement = document.querySelector('.recharts-wrapper');
      if (!chartElement) {
        throw new Error("Chart element not found");
      }
      
      const canvas = await html2canvas(chartElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      const chartImage = canvas.toDataURL("image/png");

      const farmerEntries = Object.entries(reportData);
      const halfLength = Math.ceil(farmerEntries.length / 2);
      const leftColumn = farmerEntries.slice(0, halfLength);
      const rightColumn = farmerEntries.slice(halfLength);

      const printWindow = window.open('', '', 'width=1200,height=800');

      const isMarathi = language === "marathi";
      const page1ExtraMargin = isMarathi ? 'margin-bottom: 5px;' : '';
      const soilTableFontSize = isMarathi ? 'font-size: 11px;' : 'font-size: 12px;';
      const recommendationsFontSize = isMarathi ? 'font-size: 11px;' : 'font-size: 12px;';

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${getPrintLabel('page1Title')}</title>
            <style>
              @page {
                size: A4;
                margin: 1cm;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                position: relative;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
                background-color: #ffffff;
              }
              .print-container {
                width: 100%;
                padding: 10px;
                background-color: #ffffff;
              }
              .print-section {
                margin-bottom: 15px;
                ${page1ExtraMargin}
              }
              .page-break {
                page-break-before: always;
              }
              .no-break {
                page-break-inside: avoid;
              }
              .avoid-break {
                page-break-inside: avoid;
              }
              .force-break {
                page-break-before: always;
              }
              .print-section h3 {
                background-color: #2E8B57 !important;
                color: white !important;
                padding: 6px 10px;
                font-size: 14px;
                margin: 0 0 8px 0;
                border-radius: 4px;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .print-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 10px;
                ${soilTableFontSize}
                page-break-inside: avoid;
              }
              .print-table th, .print-table td {
                border: 1px solid #ddd;
                padding: 4px;
                text-align: left;
              }
              .print-table th {
                background-color: #2E8B57 !important;
                color: white !important;
                font-weight: bold;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .print-graph {
                width: 100%;
                height: 250px;
                margin: 15px 0;
                page-break-inside: avoid;
              }
              .print-footer {
                text-align: center;
                margin-top: 15px;
                font-style: italic;
                color: #7f8c8d;
                font-size: 11px;
              }
              .optimal { color: #2ecc71 !important; }
              .low { color: #3498db !important; }
              .high { color: #e74c3c !important; }
              .two-columns {
                display: flex;
                gap: 15px;
                page-break-inside: avoid;
              }
              .column {
                flex: 1;
              }
              .legend {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin: 8px 0;
                page-break-inside: avoid;
              }
              .legend-item {
                display: flex;
                align-items: center;
                font-size: 12px !important;
                font-weight: bold !important;
                color: #000000 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .legend-color {
                width: 12px;
                height: 12px;
                margin-right: 4px;
                border: 1px solid #ddd;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .soil-results {
                max-height: none;
                overflow: visible;
                page-break-inside: avoid;
              }
              .compact-address-container {
                font-family: Arial, sans-serif;
                width: 100%;
                padding: 6px 0;
                border-top: 1px solid #000;
                border-bottom: 1px solid #000;
                margin: 10px 0;
                page-break-inside: avoid;
              }
              .address-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-wrap: nowrap;
              }
              .address-block {
                flex: 1;
                min-width: 150px;
                font-size: 10px;
              }
              .address-header {
                display: flex;
                align-items: center;
                margin-bottom: 3px;
              }
              .address-icon {
                width: 12px;
                height: 12px;
                margin-right: 4px;
                flex-shrink: 0;
              }
              .address-title {
                font-size: 10px;
                font-weight: bold;
                margin: 0;
                color: #000;
              }
              .address-text {
                font-size: 9px;
                margin: 0;
                line-height: 1.3;
              }
              .separator {
                color: #999;
                font-size: 10px;
                align-self: center;
                padding: 0 3px;
              }
              .contact-line {
                display: flex;
                align-items: center;
                margin-bottom: 2px;
              }
              .mini-icon {
                width: 8px;
                height: 8px;
                margin-right: 3px;
                flex-shrink: 0;
              }
              .header-container {
                display: flex;
                justify-content: space-between;
                margin: 15px 0;
                page-break-inside: avoid;
              }
              .lab-header-container {
                text-align: left;
                flex: 1;
              }
              .lab-header h2 {
                font-size: 0.8rem;
                color: #000;
                margin-top: 30px;
                margin-bottom: 10px;
                font-weight: bold;
              }
              .lab-notes {
                font-size: 0.75rem;
                color: #333;
                margin-top: 8px;
              }
              .note-title {
                font-weight: bold;
                margin-bottom: 5px;
              }
              .note-items {
                list-style-type: none;
                padding-left: 0;
                margin-top: 0;
                margin-bottom: 0;
              }
              .note-items li {
                position: relative;
                padding-left: 12px;
                margin-bottom: 3px;
                line-height: 1.4;
              }
              .note-items li:before {
                content: "-";
                position: absolute;
                left: 0;
              }
              .authorization-container {
                text-align: center;
                flex: 1;
              }
              .authorization-text {
                display: inline-block;
                text-align: left;
                font-size: 0.8rem;
                color: #000;
                margin-top: 30px;
                margin-bottom: 10px;
              }

              /* Print-specific fixes */
              @media print {
                body {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                  background-color: #ffffff;
                }
                .print-section h3 {
                  background-color: #2E8B57 !important;
                  color: white !important;
                }
                .print-table th {
                  background-color: #2E8B57 !important;
                  color: white !important;
                }
                .legend-item {
                  color: #000000 !important;
                }
                .optimal { color:#F1C40F !important; }
                .low { color: #2ecc71  !important; }
                .high { color: #e74c3c !important; }
                
                /* Ensure proper page breaks */
                .page-break-before {
                  page-break-before: always;
                }
                .page-break-after {
                  page-break-after: always;
                }
                .avoid-break {
                  page-break-inside: avoid;
                }
              }

              .top-slogan-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 8px 0 20px;
                padding: 0 15px;
                page-break-inside: avoid;
              }
              .slogan-text {
                flex: 1;
                text-align: left;
              }
              .main-slogan {
                font-size: 12px;
                font-weight: bold;
                color: #000;
              }
              .center-icon {
                flex: 1;
                text-align: center;
              }
              .right-icon {
                flex: 1;
                text-align: right;
              }
              .logo-icon {
                height: 50px;
                object-fit: contain;
              }
              
              /* Logo container styles */
              .logo-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                page-break-inside: avoid;
              }
              .report-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 8px;
              }
              .report-subtitle {
                font-size: 12px;
                margin-bottom: 15px;
              }
              
              /* Force colors to print */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }

              /* Marathi-specific adjustments */
              .marathi-text {
                line-height: 1.3;
              }
              
              /* Compact layout for recommendations */
              .compact-recommendations {
                ${recommendationsFontSize}
                line-height: 1.3;
              }
            </style>
          </head>
          <body class="${isMarathi ? 'marathi-text' : ''}">
            <!-- Page 1: Farmer Information and Soil Results -->
            <div class="print-container">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #2E8B57; margin: 0;">${getPrintLabel('SoilAnlysisSystem')}</h1>
              </div>

              <hr style="width: 100%; margin-top:3px; border: 1px solid #3498db;">

              <div style="margin-top:0.5px;">
                <div style="margin-top:2px;">
                  <div style="text-align: center; margin-top: 0px;">
                    <div class="report-title">${getPrintLabel('page1Title')}</div>
                    <div class="report-subtitle">${new Date().toLocaleDateString()}</div>
                  </div> 
                </div>
                
                <div class="print-section avoid-break">
                  <h3>${getPrintLabel('farmerInfo')}</h3>
                  <div class="two-columns">
                    <div class="column">
                      <table class="print-table">
                        <tbody>
                          ${leftColumn.map(([key, value]) => `
                            <tr>
                              <td width="40%"><strong>${t.formLabels[key] || key}</strong></td>
                              <td width="60%">${value}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                    <div class="column">
                      <table class="print-table">
                        <tbody>
                          ${rightColumn.map(([key, value]) => `
                            <tr>
                              <td width="40%"><strong>${t.formLabels[key] || key}</strong></td>
                              <td width="60%">${value}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="print-section avoid-break">
                  <h3>${getPrintLabel('soilResults')}</h3>
                  <div class="soil-results">
                    <table class="print-table">
                      <thead>
                        <tr>
                          <th>${t.soilTable.nutrient}</th>
                          <th>${t.soilTable.unit}</th>
                          <th>${t.soilTable.min}</th>
                          <th>${t.soilTable.max}</th>
                          <th>${t.soilTable.value}</th>
                          <th>${t.soilTable.status}</th>
                          <th>${t.soilTable.recommendation}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${soilData.map(item => {
                          const status = item.value === "" ? t.status.notEntered :
                            item.value < item.min ? t.status.low :
                              item.value > item.max ? t.status.high : t.status.optimal;
                          const statusClass = status === t.status.low ? "low" :
                            status === t.status.high ? "high" : "optimal";
                          const recommendation = getRecommendation(item.name, item.value, item.min, item.max);

                          return `
                            <tr>
                              <td>${item.name}</td>
                              <td>${item.unit}</td>
                              <td>${item.min}</td>
                              <td>${item.max}</td>
                              <td>${item.value}</td>
                              <td class="${statusClass}" style="font-weight: bold;">${status}</td>
                              <td style="${soilTableFontSize}">${recommendation}</td>
                            </tr>
                          `;
                        }).join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div class="print-footer">
                <p>${getPrintLabel('generatedOn')}: ${new Date().toLocaleString()}</p>
                <p>${t.healthySoil}</p>
                  ${getPrintLabel('page1Footer')}
                </div>
              </div>
            </div>
            
            <!-- Page 2: Graph and Recommendations -->
            <div class="print-container force-break">
              <div style="text-align: center; margin-bottom: 10px;">
                <h2 style="margin: 10px 0; font-size: 16px;">${getPrintLabel('page2Title')}</h2>
              </div>
              
              <div class="print-section avoid-break">
                <h3>${getPrintLabel('nutrientVisualization')}</h3>
                <div class="legend">
                  <div class="legend-item">
                    <div class="legend-color" style="background-color:  #2ECC71 !important;"></div>
                    <span>${getPrintLabel('lowDeficient')}</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background-color: #F1C40F !important;"></div>
                    <span>${getPrintLabel('optimal')}</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color" style="background-color: #E74C3C  !important;"></div>
                    <span>${getPrintLabel('highExcess')}</span>
                  </div>
                </div>
                
                <div class="print-graph">
                  <img src="${chartImage}" style="width: 100%; height: 100%; object-fit: contain;" />
                </div>
              </div>
              
              <div class="print-section avoid-break">
                <h3>${getPrintLabel('fertilizerRecommendations')}</h3>
                <table class="print-table compact-recommendations">
                  <tbody>
                    <tr>
                      <td width="30%"><strong>${getPrintLabel('organicFertilizer')}</strong></td>
                      <td width="70%">
                        ${language === "english"
                          ? "Based on your soil's organic carbon content, we recommend applying 5-10 tons of well-decomposed farmyard manure per hectare."
                          : "तुमच्या मातीच्या सेंद्रिय कार्बन सामग्रीवर आधारित, आम्ही प्रति हेक्टर ५-१० टन चांगले विघटित शेण  खत वापरण्याची शिफारस करतो."}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>${getPrintLabel('bioFertilizer')}</strong></td>
                      <td>
                        ${language === "english"
                          ? "Azotobacter and Phosphobacteria cultures are recommended for nitrogen and phosphorus fixation."
                          : "नायट्रोजन आणि फॉस्फरस निर्धारणासाठी ऍझोटोबॅक्टर आणि फॉस्फोबॅक्टेरिया संस्कृतींची शिफारस केली जाते."}
                      </td>
                    </tr>
                    <tr>
                      <td><strong>${getPrintLabel('limeGypsum')}</strong></td>
                      <td>${getLimeRecommendation()}</td>
                    </tr>
                    <tr>
                      <td><strong>${getPrintLabel('micronutrients')}</strong></td>
                      <td>${getMicronutrientRecommendation()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="print-section avoid-break">
                <h3>${getPrintLabel('additionalNotes')}</h3>
                <ul style="margin: 0; padding-left: 15px; font-size: 11px; line-height: 1.3;">
                  ${language === "english" ? `
                    <li>Maintain proper soil moisture for optimal nutrient availability</li>
                    <li>Rotate crops to prevent nutrient depletion</li>
                    <li>Test soil every 2-3 years to monitor changes</li>
                    <li>Consider green manuring to improve organic content</li>
                  ` : `
                    <li>मध्यम पोषक तत्व उपलब्धतेसाठी योग्य मातीतील आर्द्रता राखा</li>
                    <li>पोषक तत्वांची कमतरता टाळण्यासाठी पिकांची फेरबदल करा</li>
                    <li>बदलांचे निरीक्षण करण्यासाठी दर २-३ वर्षांनी मातीची चाचणी घ्या</li>
                    <li>सेंद्रिय सामग्री सुधारण्यासाठी हिरव्या खताचा विचार करा</li>
                  `}
                </ul>
              </div>
              
              <div class="header-container avoid-break">
                <div class="lab-header-container">
                  <div class="lab-header">
                    <h2>${getPrintLabel('analystLabInCharge')}</h2>
                    <div class="lab-notes">
                      <p class="note-title">${getPrintLabel('note')}</p>
                      <ul class="note-items">
                        ${language === "english" ? `
                          <li>The report cannot be used for court purpose.</li>
                          <li>The results refer only tested samples and applicable.</li>
                          <li>The liability of our laboratory is limited to the invoice amount.</li>
                        ` : `
                          <li>हा अहवाल न्यायालयीन हेतूसाठी वापरला जाऊ शकत नाही.</li>
                          <li>निकाल केवळ चाचणी केलेल्या नमुन्यांना संदर्भित करतात आणि लागू आहेत.</li>
                          <li>आमच्या प्रयोगशाटेची जबाबदारी चलनवाढीच्या रकमेपर्यंत मर्यादित आहे.</li>
                        `}
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="authorization-container">
                  <div class="authorization-text">
                    ${getPrintLabel('authorisedBy')}<br>
                    ${getPrintLabel('managingDirector')}<br>
                    
                  </div>
                </div>
              </div>

              <div class="top-slogan-header avoid-break">
                <div class="slogan-text">
                  <div class="main-slogan">${t.healthySoil}</div>
                </div>
              </div>

              <div class="compact-address-container avoid-break">
                <div class="address-row">
                  <div class="address-block">
                    <div class="address-header">
                      <svg class="address-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <h4 class="address-title">${getPrintLabel('officeAddress')}</h4>
                    </div>
                    <p class="address-text">Digital Soil Analysis Platform</p>
                  </div>
                  
                  <div class="separator">|</div>
                  
                  <div class="address-block">
                    <div class="address-header">
                      <svg class="address-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <h4 class="address-title">${getPrintLabel('contactEmail')}</h4>
                    </div>
                    <p class="address-text">
                      <span class="contact-line">
                        <svg class="mini-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        +91 XXXXX-XXXXX
                      </span>
                      <span class="contact-line">
                        <svg class="mini-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        info@soilanalsys.com
                      </span>
                    </p>
                  </div>
                  
                  <div class="separator">|</div>
                  
                  <div class="address-block">
                    <div class="address-header">
                      <svg class="address-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                      <h4 class="address-title">${getPrintLabel('website')}</h4>
                    </div>
                    <p class="address-text">www.soilanalsys.com</p>
                  </div>
                </div>
              </div>
              <div class="print-footer">
                <p>${getPrintLabel('page2Footer')}</p>
              </div><br>
            </div>
          </body>
        </html>
      `);

      setTimeout(() => {
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 1000);
    } catch (error) {
      console.error("Error generating print:", error);
      alert(language === "english"
        ? "Error generating print. Please try again."
        : "प्रिंट तयार करताना त्रुटी. कृपया पुन्हा प्रयत्न करा.");
    }
  };

  const getLimeRecommendation = () => {
    const pHItem = soilData.find(item => item.name === "pH");
    if (!pHItem || pHItem.value === "") return language === "english"
      ? "pH data not available"
      : "pH माहिती उपलब्ध नाही";

    if (pHItem.value < 6.0) return language === "english"
      ? "Apply 2-4 tons of agricultural lime per hectare to raise pH"
      : "pH वाढवण्यासाठी प्रति हेक्टर २-४ टन शेतीचा चुना वापरा";
    if (pHItem.value > 7.5) return language === "english"
      ? "Apply 1-2 tons of gypsum per hectare to lower pH"
      : "pH कमी करण्यासाठी प्रति हेक्टर १-२ टन जिप्सम वापरा";
    return language === "english"
      ? "No lime or gypsum needed - pH is in optimal range"
      : "चुना किंवा जिप्सम आवश्यक नाही - pH इष्टतम श्रेणीत आहे";
  };

  const getMicronutrientRecommendation = () => {
    const recommendations = [];

    soilData.forEach(item => {
      if (["Iron", "Zinc", "Manganese", "Copper", "Boron"].includes(item.name.trim())) {
        if (item.value < item.min) {
          recommendations.push(language === "english"
            ? `Apply ${item.name} supplement (${item.min - item.value} ${item.unit} deficiency)`
            : `${item.name} पूरक वापरा (${item.min - item.value} ${item.unit} उणीव)`);
        } else if (item.value > item.max) {
          recommendations.push(language === "english"
            ? `Reduce ${item.name} application (${item.value - item.max} ${item.unit} excess)`
            : `${item.name} वापर कमी करा (${item.value - item.max} ${item.unit} जास्त)`);
        }
      }
    });

    return recommendations.length > 0
      ? recommendations.join("; ")
      : language === "english"
        ? "All micronutrients are within optimal ranges"
        : "सर्व सूक्ष्म पोषक तत्व इष्टतम श्रेणीत आहेत";
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <div className="text-center lg:text-left mb-4 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              {t.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {language === "english" 
                ? "Comprehensive Soil Analysis & Reporting System" 
                : "व्यापक माती विश्लेषण आणि अहवाल प्रणाली"}
            </p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-300 hover:border-blue-500 transition-all duration-200"
            >
              <span className="text-gray-700 font-medium">{t.language}</span>
              <span className="text-blue-600 font-semibold">
                {language === "english" ? "English" : "मराठी"}
              </span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden">
                <button
                  onClick={() => toggleLanguage("english")}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 flex items-center gap-2 transition-colors duration-200"
                >
                  <span className="text-gray-700 font-medium">English</span>
                </button>
                <button
                  onClick={() => toggleLanguage("marathi")}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center gap-2 transition-colors duration-200"
                >
                  <span className="text-gray-700 font-medium">मराठी</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Farmer Information Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-10 bg-green-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">{t.farmerInfo}</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(reportData).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {t.formLabels[key] || key}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type={key.includes("Date") ? "date" : "text"}
                    name={key}
                    value={reportData[key]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
                      formErrors[key] 
                        ? "border-red-500 bg-red-50" 
                        : "border-gray-300 hover:border-gray-400 focus:border-blue-500"
                    }`}
                    placeholder={`${language === "english" ? "Enter" : "प्रविष्ट करा"} ${t.formLabels[key] || key}`}
                  />
                  {formErrors[key] && (
                    <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.submit}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Soil Data Section */}
        {isFarmerDataSubmitted && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">{t.soilData}</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-600 font-semibold text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-4 text-left rounded-tl-lg font-bold">{t.soilTable.nutrient}</th>
                    <th className="p-4 text-center font-bold">{t.soilTable.unit}</th>
                    <th className="p-4 text-center font-bold">{t.soilTable.min}</th>
                    <th className="p-4 text-center font-bold">{t.soilTable.max}</th>
                    <th className="p-4 text-center font-bold">{t.soilTable.value}</th>
                    <th className="p-4 text-center rounded-tr-lg font-bold">
                      {t.soilTable.status} & {t.soilTable.recommendation}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {soilData.map((item, index) => {
                    const status = item.value === ""
                      ? t.status.notEntered
                      : item.value < item.min
                        ? t.status.low
                        : item.value > item.max
                          ? t.status.high
                          : t.status.optimal;

                    const statusColor = status === t.status.low
                      ? "text-green-600 bg-green-50"
                      : status === t.status.high
                        ? "text-red-600 bg-red-50"
                        : status === t.status.notEntered
                          ? "text-gray-500 bg-gray-50"
                          : "text-yellow-600 bg-yellow-50";

                    const recommendation = getRecommendation(item.name, item.value, item.min, item.max);

                    return (
                      <tr 
                        key={index} 
                        className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150 even:bg-gray-50"
                      >
                        <td className="p-4 font-semibold text-gray-800">{item.name}</td>
                        <td className="p-4 text-center text-gray-600 font-medium">{item.unit}</td>
                        <td className="p-4 text-center text-gray-600">{item.min}</td>
                        <td className="p-4 text-center text-gray-600">{item.max}</td>
                        <td className="p-4">
                          <input
                            type="number"
                            step="0.01"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center transition-all duration-200 hover:border-gray-400"
                            placeholder={`${item.min}-${item.max}`}
                            value={item.value}
                            onChange={(e) => handleSoilChange(index, e.target.value)}
                          />
                        </td>
                        <td className="p-4">
                          <div className={`text-center font-bold py-2 px-3 rounded-lg ${statusColor} mb-2 transition-all duration-200`}>
                            {status}
                          </div>
                          <div className="text-xs text-gray-600 text-center leading-relaxed bg-gray-100 py-2 px-3 rounded-lg">
                            {recommendation}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={generateReport}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t.generateReport}
                </span>
              </button>
            </div>

            {/* Report Visualization Section */}
            {showGraph && (
              <div className="mt-8 space-y-8">
                {/* Graph Section */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-10 bg-purple-600 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-800">{t.graphTitle}</h3>
                  </div>

                  <div className="flex justify-center gap-6 mb-6 flex-wrap">
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border-2 border-green-200">
                      <div className="w-4 h-4 bg-green-500 rounded-lg"></div>
                      <span className="text-sm font-medium text-gray-700">
                        {language === "english" ? "Low" : "कमी"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border-2 border-yellow-200">
                      <div className="w-4 h-4 bg-yellow-500 rounded-lg"></div>
                      <span className="text-sm font-medium text-gray-700">
                        {language === "english" ? "Optimal" : "इष्टतम"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border-2 border-red-200">
                      <div className="w-4 h-4 bg-red-500 rounded-lg"></div>
                      <span className="text-sm font-medium text-gray-700">
                        {language === "english" ? "High" : "जास्त"}
                      </span>
                    </div>
                  </div>

                  <div 
                    id="chart-container"
                    className="w-full h-80 bg-white p-6 rounded-lg border-2 border-gray-200"
                    style={{ visibility: 'visible', opacity: 1 }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={soilData} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <XAxis
                          dataKey="name"
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={30}
                          tick={{ fontSize: 10, fill: "#374151" }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: "#374151" }} 
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '12px',
                            border: '2px solid #e5e7eb',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            fontSize: '12px'
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          barSize={25} 
                          radius={[8, 8, 0, 0]}
                        >
                          {soilData.map((entry, index) => (
                            <Cell 
                              key={index} 
                              fill={getBarColor(entry.value, entry.min, entry.max)} 
                              className="transition-all duration-300 hover:opacity-80"
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recommendations Section */}
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-10 bg-green-600 rounded-full"></div>
                    <h3 className="text-xl font-bold text-gray-800">{t.recommendations}</h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                        <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                          </svg>
                          {language === "english" ? "Organic Fertilizer" : "सेंद्रिय खत"}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {language === "english"
                            ? "Based on soil analysis, apply appropriate organic manure to improve soil health and structure."
                            : "माती विश्लेषणावर आधारित, मातीचे आरोग्य आणि रचना सुधारण्यासाठी योग्य सेंद्रिय खत वापरा."}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                        <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                          </svg>
                          {language === "english" ? "Bio-Fertilizer" : "जैविक खत"}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {language === "english"
                            ? "Use recommended bio-fertilizers for better nutrient absorption and soil enrichment."
                            : "चांगल्या पोषक शोषण आणि माती समृद्धीसाठी शिफारस केलेले जैविक खत वापरा."}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                        <h4 className="font-bold text-yellow-700 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                          {language === "english" ? "Lime/Gypsum" : "चुना/जिप्सम"}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {getLimeRecommendation()}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                        <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                          {language === "english" ? "Micronutrients" : "सूक्ष्म पोषक तत्व"}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {getMicronutrientRecommendation()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="text-center py-8 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-xl font-bold text-gray-700 mb-6">
                    {t.healthySoil}
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={handlePrint}
                      className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        {t.print}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilReport;