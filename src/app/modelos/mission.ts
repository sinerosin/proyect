export interface Mission {
    id: string;
    title: string;
    description: string;
    rank: 'D' | 'C' | 'B' | 'A' | 'S';
    status: 'DISPONIBLE' | 'ACEPTADA' | 'COMPLETADA';
    rewardRyo: number;
}
