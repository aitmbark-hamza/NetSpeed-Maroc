export type IpInfo = {
  ip?: string;
  version?: string;
  city?: string;
  region?: string;
  country_name?: string;
  country_code?: string;
  timezone?: string;
  org?: string;
  asn?: string;
  latitude?: number;
  longitude?: number;
};

const COUNTRY_NAMES: Record<string, string> = {
  MA: "Morocco", FR: "France", ES: "Spain", US: "United States", GB: "United Kingdom",
  DE: "Germany", IT: "Italy", NL: "Netherlands", BE: "Belgium", CA: "Canada",
  DZ: "Algeria", TN: "Tunisia", EG: "Egypt", SA: "Saudi Arabia", AE: "United Arab Emirates",
};

async function fromCloudflare(): Promise<IpInfo | null> {
  try {
    const r = await fetch("https://www.cloudflare.com/cdn-cgi/trace?_=" + Math.random(), { cache: "no-store" });
    if (!r.ok) return null;
    const text = await r.text();
    const map: Record<string, string> = {};
    text.split("\n").forEach((line) => {
      const i = line.indexOf("=");
      if (i > 0) map[line.slice(0, i)] = line.slice(i + 1);
    });
    if (!map.ip) return null;
    const cc = (map.loc || "").toUpperCase();
    return {
      ip: map.ip,
      version: map.ip.includes(":") ? "IPv6" : "IPv4",
      country_code: cc,
      country_name: COUNTRY_NAMES[cc] || cc || undefined,
    };
  } catch { return null; }
}

async function fromIpapi(): Promise<IpInfo | null> {
  try {
    const r = await fetch("https://ipapi.co/json/");
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

async function fromIpwhois(): Promise<IpInfo | null> {
  try {
    // Note: ipwho.is returns 403 errors in production
    // Using ipapi.co as primary provider instead
    return null;
  } catch { return null; }
}

/** Try providers in order (ipapi.co preferred), merging fields. Returns first non-null IP. */
export async function fetchIpInfo(): Promise<IpInfo> {
  const providers = [fromIpapi, fromCloudflare];
  let merged: IpInfo = {};
  for (const p of providers) {
    const data = await p();
    if (data) {
      merged = { ...data, ...merged };
      if (merged.ip && merged.country_name && merged.org) break;
      if (!merged.ip && data.ip) merged.ip = data.ip;
    }
    if (merged.ip && merged.country_code && merged.org) break;
  }
  return merged;
}
