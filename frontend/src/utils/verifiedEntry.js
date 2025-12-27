export default function verifiedEntry(n, fallback) {
    if (!Number.isFinite(n)) {
        return fallback;
    }
    return Math.max(0, Math.trunc(n));
}