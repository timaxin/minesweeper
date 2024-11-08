export default function compareUsingJSON (first: any, second: any): boolean {
  return JSON.stringify(first) === JSON.stringify(second);
}
