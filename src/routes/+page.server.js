import { supabase } from "$lib/supaClient";

export async function load() {
  const { data } = await supabase.from("posts").select();
  return {
	posts: data ?? [],
  };
}


