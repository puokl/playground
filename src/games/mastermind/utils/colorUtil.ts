export const pegColors: string[] = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "orange",
];

export const getColorClass = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };
  return colorMap[color] || "";
};

export const getColorClassDark = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    red: "bg-red-700",
    green: "bg-green-700",
    blue: "bg-blue-700",
    yellow: "bg-yellow-700",
    purple: "bg-purple-700",
    orange: "bg-orange-700",
  };
  return colorMap[color] || "";
};
