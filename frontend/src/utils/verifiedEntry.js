export default function verifiedEntry(n, fallback = 0) {
    if (!Number.isFinite(n)) {
        return fallback;
    }
    return Math.max(0, Math.trunc(n));
}