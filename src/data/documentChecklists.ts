export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
  notes?: string;
  format?: string; // e.g., 'PDF / Original Copy', 'Photocopy (Self-attested)'
}

export interface DocumentChecklistCategory {
  id: string;
  title: string;
  iconName: string;
  purposes: {
    id: 'new_policy' | 'claim_cashless' | 'claim_reimbursement' | 'policy_transfer';
    title: string;
    description: string;
    documents: DocumentItem[];
  }[];
}

export const DOCUMENT_CHECKLISTS: DocumentChecklistCategory[] = [
  {
    id: 'health',
    title: 'Health Insurance',
    iconName: 'HeartPulse',
    purposes: [
      {
        id: 'new_policy',
        title: 'New Policy / Portability',
        description: 'Documents required to issue a fresh health cover or port your existing health policy to a better insurer without losing continuity benefits.',
        documents: [
          {
            id: 'h_np_1',
            name: 'Aadhaar Card or Passport',
            description: 'Identity & Address Proof for all adult insured family members.',
            isRequired: true,
            format: 'Clear Photocopy / Digital PDF'
          },
          {
            id: 'h_np_2',
            name: 'PAN Card / Form 60',
            description: 'Mandatory for financial KYC and tax exemption receipts under Section 80D.',
            isRequired: true,
            format: 'Photocopy / Digital PDF'
          },
          {
            id: 'h_np_3',
            name: 'Recent Passport Size Photographs',
            description: '1 photograph for each covered member in the family floater policy.',
            isRequired: true,
            format: 'Hardcopy or Scan'
          },
          {
            id: 'h_np_4',
            name: 'Medical Test Reports (if applicable)',
            description: 'Required if age is above 45/50 years or if pre-existing conditions are declared.',
            isRequired: false,
            notes: 'Our team will assist in scheduling pre-policy checkups at Bidar diagnostic centers if needed.'
          },
          {
            id: 'h_np_5',
            name: 'Existing Policy Renewal Copy (For Portability)',
            description: 'Previous policy schedule and No Claim Bonus certificate if porting from another company.',
            isRequired: false,
            notes: 'Must submit at least 45 days prior to existing policy expiry date.'
          }
        ]
      },
      {
        id: 'claim_cashless',
        title: 'Cashless Hospital Claim',
        description: 'Documents needed at network hospital desk upon admission for cashless approval.',
        documents: [
          {
            id: 'h_cc_1',
            name: 'Health Insurance TPA Card or Policy Copy',
            description: 'Shows member ID, policy number, and TPA authorization hotline.',
            isRequired: true,
            format: 'Digital Card / Printed Policy'
          },
          {
            id: 'h_cc_2',
            name: 'Patient Aadhaar Card / Govt Photo ID',
            description: 'Identity verification at hospital admission desk.',
            isRequired: true,
            format: 'Original & Photocopy'
          },
          {
            id: 'h_cc_3',
            name: 'Pre-Authorization Pre-filled Request Form',
            description: 'Completed and signed by attending doctor / hospital TPA cell.',
            isRequired: true,
            format: 'Hospital Official Form'
          },
          {
            id: 'h_cc_4',
            name: 'Doctor First Consultation Note / Prescription',
            description: 'Doctor notes stating chief complaints, symptoms duration, and admission recommendation.',
            isRequired: true,
            format: 'Doctor Letterhead Scan'
          }
        ]
      },
      {
        id: 'claim_reimbursement',
        title: 'Reimbursement Claim (Non-Network Hospital)',
        description: 'Documents to claim money back after discharge from hospital.',
        documents: [
          {
            id: 'h_cr_1',
            name: 'Filled & Signed Claim Form',
            description: 'Part A (filled by policyholder) and Part B (filled by hospital desk).',
            isRequired: true,
            format: 'Original Hardcopy with Signatures'
          },
          {
            id: 'h_cr_2',
            name: 'Original Discharge Summary',
            description: 'Detailed clinical summary signed by attending consultant.',
            isRequired: true,
            format: 'Original Hospital Document'
          },
          {
            id: 'h_cr_3',
            name: 'Final Itemised Hospital Bill & Payment Receipts',
            description: 'Detailed breakdown of room charges, doctor fees, tests, and original numbered receipts.',
            isRequired: true,
            format: 'Original Receipts with Paid Stamp'
          },
          {
            id: 'h_cr_4',
            name: 'Diagnostic Test Reports & Pharmacy Bills',
            description: 'X-Ray, MRI, Blood reports along with matching pharmacy cash memos and prescriptions.',
            isRequired: true,
            format: 'Original Reports & Memos'
          },
          {
            id: 'h_cr_5',
            name: 'Cancelled Cheque of Policyholder',
            description: 'Must have pre-printed name of the main policyholder for direct NEFT bank transfer.',
            isRequired: true,
            format: 'Original Leaf'
          }
        ]
      }
    ]
  },
  {
    id: 'motor',
    title: 'Car & Bike Insurance',
    iconName: 'Car',
    purposes: [
      {
        id: 'new_policy',
        title: 'New Vehicle / Policy Renewal',
        description: 'Standard documents to buy or renew car, bike, or scooter insurance.',
        documents: [
          {
            id: 'm_np_1',
            name: 'Vehicle RC (Registration Certificate)',
            description: 'Smartcard RC or valid RC book showing chassis and engine numbers.',
            isRequired: true,
            format: 'Photocopy / mParivahan DigiLocker'
          },
          {
            id: 'm_np_2',
            name: 'Previous Policy Copy (for renewals)',
            description: 'Expiring policy copy showing previous year No Claim Bonus (NCB) percentage.',
            isRequired: false,
            notes: 'Required if vehicle is existing and not brand new.'
          },
          {
            id: 'm_np_3',
            name: 'Owner Aadhaar & PAN Card',
            description: 'KYC identity and address proof of registered owner.',
            isRequired: true,
            format: 'Photocopy / Scan'
          },
          {
            id: 'm_np_4',
            name: 'Invoice Copy (for brand new vehicle)',
            description: 'Sales invoice from showroom for fresh un-registered vehicles.',
            isRequired: false,
            notes: 'Needed for new vehicle insurance before RTO registration.'
          }
        ]
      },
      {
        id: 'claim_cashless',
        title: 'Accidental Motor Claim',
        description: 'Documents required for cashless garage repairs or reimbursement claim.',
        documents: [
          {
            id: 'm_cl_1',
            name: 'Duly Filled & Signed Claim Form',
            description: 'Insurer claim form specifying exact accident location, date, time, and description.',
            isRequired: true,
            format: 'Original Hardcopy'
          },
          {
            id: 'm_cl_2',
            name: 'Vehicle RC Copy & Driver Driving Licence (DL)',
            description: 'Valid Driving Licence of the person driving the vehicle at the exact time of accident.',
            isRequired: true,
            format: 'Self-attested Photocopy'
          },
          {
            id: 'm_cl_3',
            name: 'Valid Insurance Policy Copy',
            description: 'Active policy certificate active on the date of loss.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'm_cl_4',
            name: 'FIR / Spot Police Report (if applicable)',
            description: 'Mandatory in third-party injury, severe major damage, theft, or public property damage.',
            isRequired: false,
            notes: 'Required if third party injury or total theft occurred.'
          },
          {
            id: 'm_cl_5',
            name: 'Repair Estimations & Garage Cashless Approval',
            description: 'Itemised parts & labor estimation from authorized workshop.',
            isRequired: true,
            format: 'Official Garage Letterhead'
          }
        ]
      },
      {
        id: 'policy_transfer',
        title: 'Ownership Transfer Insurance',
        description: 'Documents required when buying or selling a pre-owned vehicle.',
        documents: [
          {
            id: 'm_tr_1',
            name: 'Transferred RC (New Buyer Name)',
            description: 'RTO endorsed RC showing new owner name.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'm_tr_2',
            name: 'Form 29 & Form 30 Copies',
            description: 'RTO transfer forms signed by buyer and seller.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'm_tr_3',
            name: 'Old Insurance Policy Certificate',
            description: 'Policy to be transferred within 14 days of RTO transfer.',
            isRequired: true,
            format: 'Original / Digital'
          },
          {
            id: 'm_tr_4',
            name: 'New Owner KYC (Aadhaar & PAN)',
            description: 'KYC proof for endorsement into insurance master record.',
            isRequired: true,
            format: 'Photocopy'
          }
        ]
      }
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial Vehicle (Truck, Taxi, Bus)',
    iconName: 'Truck',
    purposes: [
      {
        id: 'new_policy',
        title: 'Commercial Policy / Renewal',
        description: 'Required docs for transport vehicles, goods carriers, taxis, and yellow plate vehicles.',
        documents: [
          {
            id: 'c_np_1',
            name: 'Commercial Vehicle RC Book',
            description: 'Showing seating capacity, gross vehicle weight (GVW), and body type.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'c_np_2',
            name: 'Fitness Certificate (FC)',
            description: 'Valid RTO fitness certificate copy.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'c_np_3',
            name: 'Route Permit Copy',
            description: 'Goods permit, national permit, or passenger stage permit.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'c_np_4',
            name: 'PUC (Pollution Under Control) Certificate',
            description: 'Valid green emissions test certificate.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'c_np_5',
            name: 'Owner GSTIN & PAN (for business fleet)',
            description: 'Mandatory for claiming Input Tax Credit (ITC) on commercial insurance premiums.',
            isRequired: false,
            format: 'GST Certificate Scan'
          }
        ]
      },
      {
        id: 'claim_cashless',
        title: 'Commercial Fleet Claim',
        description: 'Accidental loss or cargo injury claim documentation.',
        documents: [
          {
            id: 'c_cl_1',
            name: 'Driver Badge & Heavy Driving Licence',
            description: 'Valid Commercial DL with hazard/passenger badge endorsement.',
            isRequired: true,
            format: 'Self-attested Copy'
          },
          {
            id: 'c_cl_2',
            name: 'Trip Sheet / Waybill / LR Copy',
            description: 'Goods carriage bill or passenger manifest at time of incident.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'c_cl_3',
            name: 'FIR & Police Panchnama',
            description: 'Police report mandatory for commercial highway accidents.',
            isRequired: true,
            format: 'Certified True Copy'
          },
          {
            id: 'c_cl_4',
            name: 'Spot Survey & Damage Estimate',
            description: 'Independent surveyor report conducted at accident site or garage.',
            isRequired: true,
            notes: 'Our Bidar desk coordinates spot surveyors directly to avoid delays.'
          }
        ]
      }
    ]
  },
  {
    id: 'life',
    title: 'Life & Term Insurance',
    iconName: 'ShieldAlert',
    purposes: [
      {
        id: 'new_policy',
        title: 'Term Plan Application',
        description: 'Documents for high sum-assured pure risk life cover.',
        documents: [
          {
            id: 'l_np_1',
            name: 'Income Proof (Form 16 / ITR / Salary Slip)',
            description: 'Last 3 years Income Tax Returns or 6 months bank statement showing regular salary/business income.',
            isRequired: true,
            format: 'Self-attested PDF / Print'
          },
          {
            id: 'l_np_2',
            name: 'Aadhaar Card & PAN Card',
            description: 'Age, Identity, and Permanent Residential Address proof.',
            isRequired: true,
            format: 'Photocopy'
          },
          {
            id: 'l_np_3',
            name: 'Bank Account Details for ECS / Mandate',
            description: 'Cancelled cheque for auto-debit of regular annual or monthly premiums.',
            isRequired: true,
            format: 'Original Cheque Leaf'
          },
          {
            id: 'l_np_4',
            name: 'Medical Examination Reports',
            description: 'Mandatory ECG, blood tests, or urine routine requested by underwriter based on age and sum assured.',
            isRequired: false,
            notes: 'Kadadi Motors coordinates free home-visit sample collections in Bidar.'
          }
        ]
      },
      {
        id: 'claim_cashless',
        title: 'Life Insurance Death Claim',
        description: 'Documents required for nominee claim settlement.',
        documents: [
          {
            id: 'l_cl_1',
            name: 'Original Policy Schedule Bond',
            description: 'Original life insurance document issued by the company.',
            isRequired: true,
            format: 'Original Document'
          },
          {
            id: 'l_cl_2',
            name: 'Official Death Certificate',
            description: 'Issued by local Municipal Corporation / Gram Panchayat.',
            isRequired: true,
            format: 'Original / Govt Certified Copy'
          },
          {
            id: 'l_cl_3',
            name: 'Claimant / Nominee KYC & Cancelled Cheque',
            description: 'Nominee Aadhaar, PAN, and bank details for claim direct credit.',
            isRequired: true,
            format: 'Attested Copies'
          },
          {
            id: 'l_cl_4',
            name: 'Medical Attending Physician Statement / Hospital Records',
            description: 'Treatment notes if death occurred in hospital.',
            isRequired: true,
            format: 'Hospital Sealed Copy'
          }
        ]
      }
    ]
  }
];
