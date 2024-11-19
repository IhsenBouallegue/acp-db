export interface Product {
  id: number;
  width: string;
  thickness: string;
  elongation: string;
  symmetry: string;
  designNumber: string;
  manufacturingSite: string;
  preMaterialQuality: string;
  preMaterialThickness: string;
  preMaterialWidth: string;
  coating: string;
  materialWeight: string;
  elongationPercentage: string;
  tearStrength: string;
  applicationInfo: string;
}

export interface Machine {
  id: number;
  web: string;
  notch: string;
  louverWidth: string;
  designNumber: string;
  machineSetNumber: string;
  manufacturingSite: string;
  machineWidth: string;
}
