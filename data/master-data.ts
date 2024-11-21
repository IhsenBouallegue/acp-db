import type { Metalstrip } from "@/types/master.types";

import type { Tool } from "@/types/master.types";

export const manufacturingSites = ["Brazil", "Canada", "China", "France", "Germany", "Mexico", "USA"];

export const metalstrips: Metalstrip[] = [
  {
    id: 1,
    width: "10",
    thickness: "2",
    elongation: "5",
    symmetry: "Yes",
    designNumber: "P001",
    manufacturingSite: "USA",
    preMaterialQuality: "High",
    preMaterialThickness: "2.5",
    preMaterialWidth: "12",
    coating: "Type A",
    materialWeight: "100",
    elongationPercentage: "15",
    tearStrength: "80",
    applicationInfo: "Standard application",
  },
  {
    id: 2,
    width: "15",
    thickness: "3",
    elongation: "7",
    symmetry: "No",
    designNumber: "P002",
    manufacturingSite: "Germany",
    preMaterialQuality: "Medium",
    preMaterialThickness: "3.0",
    preMaterialWidth: "17",
    coating: "Type B",
    materialWeight: "150",
    elongationPercentage: "12",
    tearStrength: "90",
    applicationInfo: "Heavy duty application",
  },
];

export const machines: Tool[] = [
  {
    id: 1,
    web: "5",
    notch: "2",
    louverWidth: "3",
    designNumber: "M001",
    machineSetNumber: "MS001",
    manufacturingSite: "China",
    machineWidth: "100",
  },
  {
    id: 2,
    web: "7",
    notch: "3",
    louverWidth: "4",
    designNumber: "M002",
    machineSetNumber: "MS002",
    manufacturingSite: "Mexico",
    machineWidth: "120",
  },
];

export const masterDataStats = {
  metalstrips: {
    total: 1925,
    growth: 20.1,
  },
  machines: {
    total: 955,
    growth: 10.5,
  },
  users: {
    active: 573,
    growth: 5.2,
  },
  overall: {
    growthRate: 12.5,
    monthlyChange: 2.3,
  },
};

export const distributionByCountry = [
  { country: "USA", metalstrips: 400, machines: 275 },
  { country: "Germany", metalstrips: 300, machines: 200 },
  { country: "China", metalstrips: 200, machines: 187 },
  { country: "Brazil", metalstrips: 278, machines: 173 },
  { country: "France", metalstrips: 189, machines: 120 },
];

export const productTypeDistribution = [
  { type: "Type A", count: 275 },
  { type: "Type B", count: 200 },
  { type: "Type C", count: 187 },
  { type: "Type D", count: 173 },
  { type: "Type E", count: 90 },
];
