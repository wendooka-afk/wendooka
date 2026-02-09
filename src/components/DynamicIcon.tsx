import {
  Globe, ShoppingCart, Settings, Search, Palette, Code, Zap, Rocket,
  Monitor, Layers, Layout, Shield, Users, PenTool, CheckCircle,
  Image, Share2, Edit3, Map, Download, BarChart, Megaphone, Target,
  Activity, HelpCircle,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

const iconMap: Record<string, FC<LucideProps>> = {
  Globe, ShoppingCart, Settings, Search, Palette, Code, Zap, Rocket,
  Monitor, Layers, Layout, Shield, Users, PenTool, CheckCircle,
  Image, Share2, Edit3, Map, Download, BarChart, Megaphone, Target,
  Activity, HelpCircle,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

const DynamicIcon: FC<DynamicIconProps> = ({ name, className = 'h-8 w-8' }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} />;
};

export default DynamicIcon;
