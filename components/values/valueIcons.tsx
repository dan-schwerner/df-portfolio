import { type SvgIconComponent } from "@mui/icons-material";
import LightbulbOutlined from "@mui/icons-material/LightbulbOutlined";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";
import CodeOutlined from "@mui/icons-material/CodeOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import RocketLaunchOutlined from "@mui/icons-material/RocketLaunchOutlined";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import BalanceOutlined from "@mui/icons-material/BalanceOutlined";
import PsychologyOutlined from "@mui/icons-material/PsychologyOutlined";
import { type ValueIconKey } from "@/app/sanity/constants";

/** Maps each CMS icon key (see VALUE_ICON_KEYS) to a Material UI icon. */
const ICON_MAP: Record<ValueIconKey, SvgIconComponent> = {
  lightbulb: LightbulbOutlined,
  handshake: HandshakeOutlined,
  code: CodeOutlined,
  groups: GroupsOutlined,
  bolt: BoltOutlined,
  favorite: FavoriteBorderOutlined,
  verified: VerifiedOutlined,
  insights: InsightsOutlined,
  rocket: RocketLaunchOutlined,
  school: SchoolOutlined,
  balance: BalanceOutlined,
  psychology: PsychologyOutlined,
};

/** Resolves an icon key to its component, falling back to a sensible default. */
export function valueIconFor(key: string): SvgIconComponent {
  return ICON_MAP[key as ValueIconKey] ?? LightbulbOutlined;
}
