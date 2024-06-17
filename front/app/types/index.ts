export interface Member {
  id: number;
  name: string;
  singles_total_game: number;
  singles_win_game: number;
  singles_strength: number;
  doubles_total_game: number;
  doubles_win_game: number;
  doubles_strength: number;
  history: (MemberSinglesRecord | MemberDoublesRecord)[];
}

interface MemberSinglesRecord {
  id: number;
  player_1: string;
  score_1: number;
  player_2: string;
  score_2: number;
}

interface MemberDoublesRecord {
  id: number;
  player_1: string;
  player_2: string;
  score_12: number;
  player_3: string;
  player_4: string;
  score_34: number;
}

export interface SinglesRecord {
  id: number;
  player_1: string;
  score_1: number;
  player_2: string;
  score_2: number;
  singles_players: SinglesPlayer[];
  singles_recorded_players: Member[];
}

export interface SinglesPlayer {
  id: number;
  member_id: number;
  singles_record_id: number;
}

export interface DoublesRecord {
  id: number;
  player_1: string;
  player_2: string;
  score_12: number;
  player_3: string;
  player_4: string;
  score_34: number;
  doubles_players: DoublesPlayer[];
  doubles_recorded_players: Member[];
}

export interface DoublesPlayer {
  id: number;
  member_id: number;
  doubles_record_id: number;
}

export interface Group {
  id: number;
  name: string;
  slug: string;
  admin_uid: string;
  number_of_people: number;
  created_at: Date;
  updated_at: Date;
}
