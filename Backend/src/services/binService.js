import supabase from '../config/supabaseClient.js';

export const createBin = async (location, capacity) => {
  try {
    const { data, error } = await supabase
      .from('bins')
      .insert([
        {
          location,
          capacity,
          current_fill: 0,
          status: 'active',
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to create bin: ${error.message}`);
  }
};

export const getAllBins = async () => {
  try {
    const { data, error } = await supabase
      .from('bins')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to get bins: ${error.message}`);
  }
};

export const getBinById = async (bin_id) => {
  try {
    const { data, error } = await supabase
      .from('bins')
      .select('*')
      .eq('id', bin_id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to get bin: ${error.message}`);
  }
};

export const updateBinStatus = async (bin_id, status, current_fill) => {
  try {
    const updateData = { status };
    if (current_fill !== undefined) {
      updateData.current_fill = current_fill;
    }
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('bins')
      .update(updateData)
      .eq('id', bin_id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to update bin: ${error.message}`);
  }
};

export const deleteBin = async (bin_id) => {
  try {
    const { error } = await supabase
      .from('bins')
      .delete()
      .eq('id', bin_id);

    if (error) throw error;
    return true;
  } catch (error) {
    throw new Error(`Failed to delete bin: ${error.message}`);
  }
};

export const getBinsByStatus = async (status) => {
  try {
    const { data, error } = await supabase
      .from('bins')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to get bins by status: ${error.message}`);
  }
};
