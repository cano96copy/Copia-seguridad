import { FileText, Mail, FileCheck, Video, HandshakeIcon, Calendar, Send } from "lucide-react";

const CircularChart = () => {
  const items = [
    { id: 1, label: "Posts de LinkedIn", icon: FileText },
    { id: 2, label: "Cartas de venta", icon: FileCheck },
    { id: 3, label: "Páginas de registro", icon: Mail },
    { id: 4, label: "Guiones de ads", icon: Video },
    { id: 5, label: "Secuencias de bienvenida", icon: HandshakeIcon },
    { id: 6, label: "Secuencia email pre webinar", icon: Calendar },
    { id: 7, label: "Secuencias email pos webinar", icon: Send },
  ];

  // Calcular posiciones en círculo
  const centerX = 200;
  const centerY = 200;
  const radius = 140;
  const iconRadius = 30;

  const getPosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90; // -90 para empezar arriba
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
    };
  };

  return (
    <div className="w-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-[500px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Segmentos del círculo exterior */}
        {items.map((item, index) => {
          const startAngle = ((index * 360) / items.length - 90) * (Math.PI / 180);
          const endAngle = (((index + 1) * 360) / items.length - 90) * (Math.PI / 180);
          const outerRadius = 120;
          const innerRadius = 80;

          const x1 = centerX + innerRadius * Math.cos(startAngle);
          const y1 = centerY + innerRadius * Math.sin(startAngle);
          const x2 = centerX + outerRadius * Math.cos(startAngle);
          const y2 = centerY + outerRadius * Math.sin(startAngle);
          const x3 = centerX + outerRadius * Math.cos(endAngle);
          const y3 = centerY + outerRadius * Math.sin(endAngle);
          const x4 = centerX + innerRadius * Math.cos(endAngle);
          const y4 = centerY + innerRadius * Math.sin(endAngle);

          const pathData = `
            M ${x1} ${y1}
            L ${x2} ${y2}
            A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3}
            L ${x4} ${y4}
            A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}
          `;

          // Alternar colores entre azul claro y azul oscuro
          const colors = ["#0EA5E9", "#3B82F6", "#06B6D4", "#0284C7", "#2563EB", "#1D4ED8", "#0369A1"];
          
          return (
            <path
              key={item.id}
              d={pathData}
              fill={colors[index % colors.length]}
              className="transition-all duration-300 hover:opacity-80"
            />
          );
        })}

        {/* Círculo central blanco */}
        <circle
          cx={centerX}
          cy={centerY}
          r="70"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="3"
        />

        {/* Número central */}
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          className="text-6xl font-bold"
          fill="#3B82F6"
          style={{ fontFamily: 'system-ui' }}
        >
          7
        </text>

        {/* Ícono de copywriting en el centro (pluma o documento) */}
        <g transform={`translate(${centerX - 15}, ${centerY - 50})`}>
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
            fill="#3B82F6"
            transform="scale(1.2)"
          />
        </g>

        {/* Círculos y líneas para los iconos exteriores */}
        {items.map((item, index) => {
          const pos = getPosition(index, items.length);
          const Icon = item.icon;

          return (
            <g key={`icon-${item.id}`}>
              {/* Línea desde el círculo hasta el icono */}
              <line
                x1={centerX + (80 * Math.cos(((index * 360) / items.length - 90) * (Math.PI / 180)))}
                y1={centerY + (80 * Math.sin(((index * 360) / items.length - 90) * (Math.PI / 180)))}
                x2={pos.x}
                y2={pos.y}
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="4,4"
              />

              {/* Círculo para el icono */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={iconRadius}
                fill="white"
                stroke="#E5E7EB"
                strokeWidth="3"
                className="transition-all duration-300 hover:stroke-primary"
              />

              {/* Número dentro del círculo */}
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                className="text-sm font-bold"
                fill="#3B82F6"
                style={{ fontFamily: 'system-ui' }}
              >
                {item.id}
              </text>
            </g>
          );
        })}

        {/* Etiquetas de texto */}
        {items.map((item, index) => {
          const pos = getPosition(index, items.length);
          const angle = (index * 360) / items.length - 90;
          
          // Ajustar posición del texto según el ángulo
          let textAnchor: "start" | "middle" | "end" = "middle";
          let dx = 0;
          let dy = 0;

          if (angle > -90 && angle < 90) {
            // Derecha
            textAnchor = "start";
            dx = 40;
          } else {
            // Izquierda
            textAnchor = "end";
            dx = -40;
          }

          // Ajustar verticalmente
          if (angle > -45 && angle < 45) {
            dy = 5;
          } else if (angle > 135 || angle < -135) {
            dy = 5;
          }

          return (
            <text
              key={`label-${item.id}`}
              x={pos.x + dx}
              y={pos.y + dy}
              textAnchor={textAnchor}
              className="text-xs font-semibold"
              fill="#1F2937"
              style={{ fontFamily: 'system-ui', maxWidth: '100px' }}
            >
              {item.label.split(' ').map((word, i) => (
                <tspan
                  key={i}
                  x={pos.x + dx}
                  dy={i === 0 ? 0 : 12}
                >
                  {word}
                </tspan>
              ))}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default CircularChart;

