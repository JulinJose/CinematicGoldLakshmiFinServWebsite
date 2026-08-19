export interface GoldLoanPlanDetail {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  badge: string;
  rate: string;
  tenure: string;
  img: string;
  bannerTitle: string;
  info: string;
  termsText?: string;
  terms: string[];
}

export const GOLD_LOAN_PLANS_DATA: GoldLoanPlanDetail[] = [
  {
    id: "easy-pro-2",
    title: "Easy Pro 2",
    subtitle: "Minimum Rs.3 lakh",
    amount: "Minimum Rs.3 lakh",
    badge: "High Valuation",
    rate: "16.00%",
    tenure: "9 Months",
    img: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop",
    bannerTitle: "Gold Loan Easy Pro 2",
    info: "Gold Lakshmi Finserv introduces the Easy Pro 2 Gold Loan Scheme, offering an interest rate of 16.00% to provide quick and hassle-free financial solutions. This scheme allows individuals to avail a minimum loan amount of ₹3 lakh, making it an ideal option for those seeking immediate funds against their gold assets. With a loan tenure of up to 9 months, this scheme is designed to offer flexibility in repayments while ensuring that customers can retain possession of their gold during the loan period.",
    termsText: "The Easy Pro 2 Gold Loan Scheme is available to individuals aged 18 and above with valid identification and proof of gold ownership. The loan carries an interest rate of 16.00% per annum, applicable for the entire duration of 9 months. In case of late repayments, additional charges may apply as per Gold Lakshmi Finserv's policies. The minimum loan amount under this scheme is ?3 lakh, subject to the value, purity, and loan-to-value (LTV) ratio of the pledged gold. All loan approvals are at the discretion of Gold Lakshmi Finserv and are based on internal evaluation criteria.",
    terms: [
      "Gold ornaments pledged under Easy Pro 2 will be appraised by certified valuers using non-destructive XRF technology.",
      "Interest is calculated on a monthly basis, payable upon monthly cycle or loan closure.",
      "Zero prepayment charges for early loan settlement.",
      "Gold assets are stored in bank-grade 24/7 monitored, fully insured vaults.",
      "Minimum loan amount eligible under this scheme is ₹3,00,000."
    ]
  },
  {
    id: "easy-pro",
    title: "Easy Pro",
    subtitle: "Rs.3 lakh to Rs.499999",
    amount: "Rs.3 lakh to Rs.499999",
    badge: "Popular Choice",
    rate: "18.00%",
    tenure: "12 Months",
    img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop",
    bannerTitle: "Gold Loan Easy Pro",
    info: "Gold Lakshmi Finserv offers the Easy Pro Gold Loan Scheme at an interest rate of 18.00%, providing a financial lifeline to individuals seeking loans against their gold assets. Customers can avail loan amounts ranging from ₹3 lakh to ₹4,99,999, making it a flexible option for those in need of mid-range financing. With a loan tenure of up to 12 months, this scheme offers sufficient time for repayment while ensuring that customers retain ownership of their pledged gold.",
    termsText: "The Easy Pro Gold Loan Scheme is available to customers aged 18 and above with valid identification and gold ownership proof. The scheme features an interest rate of 18.00% per annum, applicable for the entire loan duration of 12 months. Delayed repayments may incur additional charges in line with Gold Lakshmi Finserv's policies. The loan amount, ranging between ₹3 lakh and ₹4,99,999, will be sanctioned based on the value, purity, and loan-to-value (LTV) ratio of the pledged gold. Loan approval is subject to the discretion of Gold Lakshmi Finserv and adherence to the company's evaluation criteria.",
    terms: [
      "Flexible monthly interest repayment with option for partial principal payment.",
      "100% insured vault storage for pledged ornaments.",
      "Minimal documentation: Aadhaar Card and PAN Card only.",
      "Instant bank transfer upon purity assay completion."
    ]
  },
  {
    id: "easy-blue-2",
    title: "Easy Blue 2",
    subtitle: "Rs.1000 to Rs.99,999",
    amount: "Rs.1000 to Rs.99,999",
    badge: "Micro Loan",
    rate: "18.00%",
    tenure: "12 Months",
    img: "https://images.unsplash.com/photo-1624365168056-daf44387e2ae?w=600&auto=format&fit=crop",
    bannerTitle: "Gold Loan Easy Blue 2",
    info: "Gold Lakshmi Finserv introduces the Easy Blue 2 Gold Loan Scheme, offering loans at an interest rate of 18.00%, tailored for individuals seeking smaller loan amounts. Customers can avail loans ranging from ₹1,000 to ₹99,999, providing a quick and accessible solution for short-term financial needs. With a loan tenure of up to 12 months, this scheme ensures flexibility in repayment, allowing customers to meet urgent financial requirements while retaining ownership of their gold.",
    termsText: "The Easy Blue 2 Gold Loan Scheme is available to individuals aged 18 and above, with valid identification and proof of gold ownership. The interest rate of 18.00% per annum applies for the entire loan tenure of 12 months. In case of delayed repayments, additional charges may be imposed as per Gold Lakshmi Finserv's policy. Loan amounts between ₹1,000 and ₹99,999 will be sanctioned based on the value, purity, and loan-to-value (LTV) ratio of the pledged gold. Loan approvals are subject to Gold Lakshmi Finserv's discretion and evaluation criteria.",
    terms: [
      "Instant disbursal to bank account or cash upon verification.",
      "No minimum credit score or income proof required.",
      "Zero processing fees on micro gold loans below ₹50,000.",
      "Tenure of up to 12 months with easy extension option."
    ]
  },
  {
    id: "easy-max-2",
    title: "Easy Max 2",
    subtitle: "Minimum Rs.1 lakh",
    amount: "Minimum Rs.1 lakh",
    badge: "Mid-Level Funding",
    rate: "18.00%",
    tenure: "9 Months",
    img: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&auto=format&fit=crop",
    bannerTitle: "Gold Loan Easy Max 2",
    info: "Gold Lakshmi Finserv offers the Easy Max 2 Gold Loan Scheme with an interest rate of 18.00%, providing a convenient financial solution for customers in need of mid-level financing. The scheme allows individuals to avail loans starting from a minimum of ₹1 lakh, offering quick access to funds against gold assets. With a loan tenure of up to 9 months, this scheme is designed to offer both flexibility and ease of repayment, while ensuring customers retain possession of their gold.",
    termsText: "The Easy Max 2 Gold Loan Scheme is available to individuals aged 18 and above, with valid identification and proof of gold ownership. The loan is subject to an interest rate of 18.00% per annum, applicable for the entire loan period of 9 months. Any delays in repayment may result in additional charges as per Gold Lakshmi Finserv's policy. The minimum loan amount is ?1 lakh, and the loan approval is based on the value, purity, and loan-to-value (LTV) ratio of the pledged gold. Approval is at the discretion of Gold Lakshmi Finserv, based on its internal evaluation process.",
    terms: [
      "Loans starting from a minimum of ₹1 lakh with quick disbursal.",
      "Maximum loan-to-value ratio based on daily RBI gold valuation benchmarks.",
      "Zero prepayment penalty for early loan settlement.",
      "Gold assets secured in 24/7 monitored, fully insured vaults."
    ]
  },
  {
    id: "easy-max",
    title: "Easy Max",
    subtitle: "Rs.1 lakh to Rs.299999",
    amount: "Rs.1 lakh to Rs.299999",
    badge: "Medium Range",
    rate: "21.00%",
    tenure: "12 Months",
    img: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=600&auto=format&fit=crop",
    bannerTitle: "Gold Loan Easy Max",
    info: "Gold Lakshmi Finserv presents the Easy Max Gold Loan Scheme with an interest rate of 21.00%, offering a reliable financial solution for those in need of medium-range funding. Customers can avail loan amounts ranging from ₹1 lakh to ₹2,99,999, providing flexibility for various financial requirements. With a loan tenure of up to 12 months, this scheme offers ample time for repayment, allowing customers to access funds quickly while retaining ownership of their pledged gold.",
    termsText: "The Easy Max Gold Loan Scheme is available to individuals aged 18 and above with valid identification and proof of gold ownership. The loan carries an interest rate of 21.00% per annum, applicable for the entire 12-month loan tenure. Late repayments may attract additional charges as per Gold Lakshmi Finserv's policy. Loan amounts between ₹1 lakh and ₹2,99,999 will be sanctioned based on the gold's value, purity, and loan-to-value (LTV) ratio. All loan approvals are subject to Gold Lakshmi Finserv's discretion and evaluation criteria.",
    terms: [
      "Loan amounts ranging from ₹1 lakh to ₹2,99,999.",
      "Fully paperless digital KYC verification.",
      "Flexible tenure options up to 12 months.",
      "Immediate release of gold ornaments upon complete repayment."
    ]
  },
  {
    id: "super-value",
    title: "Super Value Gold Loan",
    subtitle: "Applicable through all ticket sizes",
    amount: "Applicable through all ticket sizes",
    badge: "Universal Scheme",
    rate: "23.00%",
    tenure: "12 Months",
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop",
    bannerTitle: "Super Value Gold Loan",
    info: "Gold Lakshmi Finserv introduces the Super Value Gold Loan Scheme, offering an interest rate of 23.00% across all ticket sizes. This scheme is designed to cater to a wide range of financial needs, providing customers the flexibility to avail loans against their gold, irrespective of the loan amount. With a loan tenure of up to 12 months, the Super Value Gold Loan Scheme ensures convenient repayment options while allowing customers to retain ownership of their gold assets during the loan period.",
    termsText: "The Super Value Gold Loan Scheme is available to individuals aged 18 and above, with valid identification and proof of gold ownership. The scheme offers a fixed interest rate of 23.00% per annum, applicable for the full loan tenure of 12 months, across all ticket sizes. Late repayment may incur additional charges in accordance with Gold Lakshmi Finserv's policy. Loan approval is subject to the gold's value, purity, and loan-to-value (LTV) ratio, as well as the discretion of Gold Lakshmi Finserv based on its internal evaluation process.",
    terms: [
      "Applicable across all ticket sizes without upper loan limits.",
      "Pledged gold jewelry purities 18K and above accepted.",
      "Transparent monthly interest billing with instant online payment support.",
      "Comprehensive insurance coverage while stored in security vaults."
    ]
  },
  {
    id: "restart-india-pradhan",
    title: "Restart India Pradhan",
    subtitle: "Rs.8 lakh to Rs.20 lakh",
    amount: "Rs.8 lakh to Rs.20 lakh",
    badge: "High Value Funding",
    rate: "11.99%",
    tenure: "9 Months",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop",
    bannerTitle: "Restart India Pradhan",
    info: "Gold Lakshmi Finserv offers the Restart India Pradhan Gold Loan Scheme at a competitive interest rate of 11.99%, designed to help individuals meet their financial needs efficiently. Under this scheme, customers can avail of loans ranging from ₹8 lakh to ₹20 lakh, secured against their gold assets. The scheme is tailored for short-term requirements with a loan tenure of up to 9 months, providing flexible repayment options. This initiative is aimed at offering quick financial assistance, enabling individuals to unlock the value of their gold without selling it.",
    termsText: "The Restart India Pradhan Gold Loan Scheme is available to customers aged 18 and above, with valid identification and ownership proof of the gold being pledged. The interest rate of 11.99% per annum is applicable for the entire loan tenure of 9 months. In case of delayed payments, additional charges may apply as per the company's policy. The minimum loan amount is ₹8 lakh, and the maximum loan amount is ₹20 lakh, subject to the value of the pledged gold. All loans are sanctioned at the discretion of Gold Lakshmi Finserv and are subject to gold purity, loan-to-value (LTV) ratio, and other criteria.",
    terms: [
      "High-value loan amounts from ₹8 lakh up to ₹20 lakh.",
      "Competitive 11.99% interest rate with 9 months tenure.",
      "Dedicated Relationship Manager for fast-track processing.",
      "Zero prepayment penalty for early loan closure."
    ]
  },
  {
    id: "restart-india-elite",
    title: "Restart India Elite",
    subtitle: "Minimum Rs.5 lakh",
    amount: "Minimum Rs.5 lakh",
    badge: "Elite Financial Support",
    rate: "12.99%",
    tenure: "9 Months",
    img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop",
    bannerTitle: "Restart India Elite",
    info: "Gold Lakshmi Finserv presents the Restart India Elite Gold Loan Scheme with an attractive interest rate of 12.99%, designed to provide financial support to customers looking to leverage their gold assets. Under this scheme, individuals can avail loans starting from a minimum of ₹5 lakh, offering a convenient solution for immediate financial needs. The loan tenure is up to 9 months, allowing flexibility in repayment while ensuring that customers can retain ownership of their gold throughout the loan period.",
    termsText: "The Restart India Pradhan Gold Loan Scheme is available to individuals aged 18 and above with valid identification and proof of gold ownership. The interest rate of 12.99% per annum will be applicable for the entire loan period of 9 months. Failure to repay the loan within the stipulated period may result in additional charges as per Gold Lakshmi Finserv's policies. The minimum loan amount that can be availed is ₹5 lakh, subject to the value of the gold pledged, purity, and loan-to-value (LTV) ratio. Approval of loans is at the sole discretion of Gold Lakshmi Finserv based on its evaluation criteria.",
    terms: [
      "Minimum loan amount starting from ₹5 lakh.",
      "Attractive interest rate of 12.99% with up to 9 months tenure.",
      "Fast-track processing and direct wire transfer.",
      "100% bank-grade vault security with full insurance coverage."
    ]
  }
];
