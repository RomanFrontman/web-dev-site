// src/lib/db.ts
import { supabase } from './supabase';
import type { Project, Skill, Message, Page, PricingPlan, PricingOption } from '../types/database';

// ── Projects ─────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addProject(
  data: Omit<Project, 'id' | 'created_at'>
): Promise<Project> {
  const { data: row, error } = await supabase
    .from('projects')
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return row;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, 'id' | 'created_at'>>
): Promise<Project> {
  const { data: row, error } = await supabase
    .from('projects')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return row;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── Skills ───────────────────────────────────────────────────

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addSkill(
  data: Omit<Skill, 'id' | 'created_at'>
): Promise<Skill> {
  const { data: row, error } = await supabase
    .from('skills')
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return row;
}

export async function updateSkill(
  id: string,
  data: Partial<Omit<Skill, 'id' | 'created_at'>>
): Promise<Skill> {
  const { data: row, error } = await supabase
    .from('skills')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return row;
}

export async function deleteSkill(id: string): Promise<void> {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── Messages ─────────────────────────────────────────────────

export async function getMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addMessage(
  data: Omit<Message, 'id' | 'created_at' | 'read'>
): Promise<Message> {
  const { data: row, error } = await supabase
    .from('messages')
    .insert({ ...data, read: false })
    .select()
    .single();
  if (error) throw error;
  return row;
}

export async function markAsRead(id: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', id);
  if (error) throw error;
}

export async function setReadStatus(id: string, read: boolean): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .update({ read })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteMessage(id: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── Pages ────────────────────────────────────────────────────

export async function getPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null; // no row found
    throw error;
  }
  return data;
}

export async function addPage(
  data: Omit<Page, 'id' | 'updated_at'>
): Promise<Page> {
  const { data: row, error } = await supabase
    .from('pages')
    .insert(data)
    .select()
    .single();
  if (error) throw error;
  return row;
}

export async function updatePage(
  id: string,
  data: Partial<Omit<Page, 'id' | 'updated_at'>>
): Promise<void> {
  // updated_at is set by a DB trigger — do not send it from the client.
  const { error } = await supabase
    .from('pages')
    .update(data)
    .eq('id', id);
  if (error) throw error;
}

export async function deletePage(id: string): Promise<void> {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ── Pricing Plans ─────────────────────────────────────────────

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const { data, error } = await supabase
    .from('pricing_plans')
    .select('*')
    .order('order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function updatePricingPlan(
  id: string,
  data: Partial<Omit<PricingPlan, 'id' | 'created_at'>>
): Promise<PricingPlan> {
  const { data: row, error } = await supabase
    .from('pricing_plans')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return row;
}

// ── Pricing Options (Calculator) ──────────────────────────────

export async function getPricingOptions(): Promise<PricingOption[]> {
  const { data, error } = await supabase
    .from('pricing_options')
    .select('*')
    .order('step', { ascending: true })
    .order('order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function updatePricingOption(
  id: string,
  data: Partial<Omit<PricingOption, 'id' | 'created_at'>>
): Promise<PricingOption> {
  const { data: row, error } = await supabase
    .from('pricing_options')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return row;
}
