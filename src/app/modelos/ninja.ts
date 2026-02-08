export interface Ninja {
    id: string;
    username: string;
    rank: 'Academy'|'Genin' | 'Chunin' | 'Jonin' | 'Kage';
    avatar?: string;
}
